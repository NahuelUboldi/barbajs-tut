import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import barbaRouter from '@barba/router';
import gsap from 'gsap';
import {
  animationEnter,
  animationLeave,
  revealProject,
  leaveFromProject,
  leaveToProject,
} from './animations';
barba.use(barbaRouter, {
  routes: myRoutes,
});

barba.use(barbaPrefetch);
const myRoutes = [
  { name: 'home', path: './index.html' },
  { name: 'architecture', path: './architecture.html' },
  { name: 'detail', path: './detail-page.html' },
  { name: 'detail-2', path: './detail-page-2.html' },
];

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});

const resetActiveLink = () =>
  gsap.set('a.is-active span', { xPercent: -100, transformOrigin: 'left' });

barba.init({
  views: [
    {
      namespace: 'architecture',
      beforeEnter(data) {
        console.log(data, 'before enter architecture');
      },
    },
  ],
  transitions: [
    {
      name: 'detail',
      to: {
        namespace: ['detail'],
      },
      once({ next }) {
        revealProject(next.container);
      },
      leave: ({ current }) => leaveToProject(current.container),
      enter({ next }) {
        revealProject(next.container);
      },
    },
    {
      name: 'general-transition',
      once({ next }) {
        resetActiveLink();
        gsap.from('header a', {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: 'power1.out',
          onComplete: () => animationEnter(next.container),
        });
      },
      leave: ({ current }) => animationLeave(current.container),
      enter({ next }) {
        animationEnter(next.container);
      },
    },
    {
      name: 'from-detail',
      from: {
        namespace: ['detail'],
      },
      leave: ({ current }) => leaveFromProject(current.container),
      enter({ next }) {
        gsap.from('header a', {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: 'power1.out',
        });
        animationEnter(next.container);
      },
    },
  ],
});
