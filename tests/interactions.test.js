import test from "node:test";
import assert from "node:assert/strict";
import {
  lockBodyScroll,
  isOutsidePointer,
  isBackdropPoint,
  cursorMode,
} from "../src/utils/interactions.js";

test("overlapping overlays keep scrolling locked regardless of release order", () => {
  const doc = { body: { style: { overflow: "clip" } } };
  const releaseMenu = lockBodyScroll(doc),
    releaseModal = lockBodyScroll(doc);
  assert.equal(doc.body.style.overflow, "hidden");
  releaseMenu();
  releaseMenu();
  assert.equal(doc.body.style.overflow, "hidden");
  releaseModal();
  assert.equal(doc.body.style.overflow, "clip");
  lockBodyScroll(null)();
});
test("outside detection rejects missing refs and non-Node targets and respects composed paths", () => {
  class Node {}
  const child = new Node(),
    outside = new Node();
  const container = {
    isConnected: true,
    ownerDocument: { defaultView: { Node } },
    contains: (node) => node === child,
  };
  assert.equal(isOutsidePointer({ target: outside }, container), true);
  assert.equal(isOutsidePointer({ target: child }, container), false);
  for (const target of [null, undefined, {}, { window: true }])
    assert.equal(isOutsidePointer({ target }, container), false);
  assert.equal(isOutsidePointer({ target: outside }, null), false);
  assert.equal(
    isOutsidePointer({ target: outside }, { ...container, isConnected: false }),
    false,
  );
  assert.equal(
    isOutsidePointer(
      { target: outside, composedPath: () => [outside, container] },
      container,
    ),
    false,
  );
});
test("backdrop hit testing distinguishes dialog padding, descendants and actual outside points", () => {
  const dialog = {
    isConnected: true,
    getBoundingClientRect: () => ({
      left: 100,
      right: 500,
      top: 50,
      bottom: 700,
    }),
  };
  const hit = (x, y, target = dialog) =>
    isBackdropPoint({ target, clientX: x, clientY: y }, dialog);
  assert.equal(hit(50, 200), true);
  assert.equal(hit(200, 200), false);
  assert.equal(hit(50, 200, {}), false);
  assert.equal(hit(NaN, 200), false);
  assert.equal(isBackdropPoint(null, null), false);
});
test("cursor classification is stable over ordinary text and respects native controls", () => {
  const element = (category) => ({
    nodeType: 1,
    closest: (selector) => {
      if (selector.startsWith("input"))
        return category === "native" ? {} : null;
      if (selector.startsWith("a["))
        return category === "interactive" ? {} : null;
      if (selector.startsWith("img")) return category === "image" ? {} : null;
      if (selector.startsWith(".project"))
        return category === "card" ? {} : null;
      throw new Error("Unexpected category query");
    },
  });
  for (const tag of ["heading", "paragraph", "span", "container"])
    assert.equal(cursorMode(element(tag)), "default");
  for (const category of ["native", "interactive", "image", "card"])
    assert.equal(cursorMode(element(category)), category);
  assert.equal(
    cursorMode({ nodeType: 3, parentElement: element("interactive") }),
    "interactive",
  );
  assert.equal(cursorMode(null), "native");
  assert.equal(cursorMode({}), "native");
});
