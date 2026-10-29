const MAX_RECENT_TURNS = 8;
const DIGEST_SNIPPET_LENGTH = 160;
const UNAVAILABLE_REPLY = "[reply unavailable]";

const toTurn = (entry) => {
  if (!entry || typeof entry !== "object") return null;
  const text = typeof entry.text === "string" ? entry.text.trim() : "";
  if (!text || text.startsWith("Error:")) return null;

  const sender = entry.sender || entry.role;
  let role = null;
  if (sender === "user") role = "user";
  if (sender === "model" || sender === "bot") role = "model";
  return role ? { role, text } : null;
};

const mergeConsecutiveTurns = (turns) => {
  return turns.reduce((merged, turn) => {
    const previous = merged[merged.length - 1];
    if (previous && previous.role === turn.role) {
      previous.text = `${previous.text}\n${turn.text}`;
      return merged;
    }
    merged.push({ ...turn });
    return merged;
  }, []);
};

const snippet = (text) => {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= DIGEST_SNIPPET_LENGTH) return oneLine;
  return `${oneLine.slice(0, DIGEST_SNIPPET_LENGTH - 1).trim()}…`;
};

const describeTurns = (turns) =>
  turns
    .map((turn) =>
      turn.role === "user"
        ? `- Visitor: ${snippet(turn.text)}`
        : `- I replied: ${snippet(turn.text)}`
    )
    .join("\n");

export const prepareConversation = (history, message) => {
  const trimmedMessage = message.trim();
  let turns = mergeConsecutiveTurns(
    (Array.isArray(history) ? history : []).map(toTurn).filter(Boolean)
  );

  if (turns[0]?.role === "model") turns = turns.slice(1);

  const lastTurn = turns[turns.length - 1];
  if (lastTurn?.role === "user" && lastTurn.text === trimmedMessage) {
    turns = turns.slice(0, -1);
  } else if (lastTurn?.role === "user") {
    turns = [
      ...turns,
      { role: "model", text: UNAVAILABLE_REPLY },
    ];
  }

  const maxMessages = MAX_RECENT_TURNS * 2;
  const overflow =
    turns.length > maxMessages ? turns.slice(0, turns.length - maxMessages) : [];
  let recent = turns.length > maxMessages ? turns.slice(-maxMessages) : turns;

  if (recent[0]?.role === "model") {
    overflow.push(recent[0]);
    recent = recent.slice(1);
  }

  return {
    history: recent.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    earlierContext: describeTurns(overflow),
    message: trimmedMessage,
  };
};
