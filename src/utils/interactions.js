// Shared interaction primitives: no global state updates and no event suppression.
const scrollLocks = new WeakMap();
export function lockBodyScroll(doc = document) {
  const body = doc?.body;
  if (!body) return () => {};
  let lock = scrollLocks.get(body);
  if (!lock) {
    lock = { count: 0, overflow: body.style.overflow };
    scrollLocks.set(body, lock);
    body.style.overflow = "hidden";
  }
  lock.count += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--lock.count === 0) {
      body.style.overflow = lock.overflow;
      scrollLocks.delete(body);
    }
  };
}
export function isOutsidePointer(event, container) {
  if (!container?.isConnected) return false;
  if (
    typeof event?.composedPath === "function" &&
    event.composedPath().includes(container)
  )
    return false;
  const NodeType = container.ownerDocument?.defaultView?.Node;
  if (!NodeType || !(event?.target instanceof NodeType)) return false;
  return !container.contains(event.target);
}
export function isBackdropPoint(event, dialog) {
  if (!dialog?.isConnected || event?.target !== dialog) return false;
  if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY))
    return false;
  const box = dialog.getBoundingClientRect();
  return (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  );
}
export function cursorMode(target) {
  const element = target?.nodeType === 1 ? target : target?.parentElement;
  if (!element || typeof element.closest !== "function") return "native";
  if (
    element.closest(
      "input, textarea, select, option, label, [contenteditable]:not([contenteditable='false']), [disabled], [aria-disabled='true'], [data-native-cursor], [data-selectable-text], dialog[open]",
    )
  )
    return "native";
  if (
    element.closest("a[href], button, summary, [role='button'], [role='link']")
  )
    return "interactive";
  if (element.closest("img, .portrait-card")) return "image";
  if (element.closest(".project-card, .skill-card, .service-card"))
    return "card";
  return "default";
}
