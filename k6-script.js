import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  vus: 600,
  duration: '30s'
};


const rand = () => Math.floor(Math.random() * 1000);

export default function () {

  const before = new Date().getTime();
  const T = 6; // time needed to complete a VU iteration

  // Replace this with normal requests w/o a for-loop
  for (let i = 0; i < 10; i++) {
    // http.get(`http://localhost:2500/listings/${rand()}`);
    http.get(`http://13.57.189.94:2500/`);
  }

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(
      `Timer exhausted! The execution time of the test took longer than ${T} seconds`
    );
  }
}