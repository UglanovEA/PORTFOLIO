const cursor = document.querySelector('.cursor');
const cursorRadius = Math.round(cursor.getBoundingClientRect().width / 2);

const mouse = { x: 0, y: 0 };
const pos = { x: 0, y: 0 };
const ratio = 0.06;

const draw = () => {
  pos.x += (mouse.x - cursorRadius - pos.x) * ratio;
  pos.y += (mouse.y - cursorRadius - pos.y) * ratio;
  cursor.style.transform = `translate3d(${pos.x}px ,${pos.y}px, 0)`;
};

const update = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener('mousemove', update, { capture: false, passive: true });

function animate() {
  draw();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

