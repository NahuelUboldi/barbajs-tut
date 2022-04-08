import barba from '@barba/core';
import barbaCss from '@barba/css';

// tell Barba to use the css plugin
barba.use(barbaCss);

const body = document.querySelector('body');

//GLOBAL HOOK
//runs before every transitions
barba.hooks.before((data) => {
  const bg = data.current.container.dataset.background;
  body.style.setProperty('--page-background', bg);
});

// init Barba
barba.init({
  transitions: [
    {
      //runs once on the page load
      name: 'home', //overides the barba for home in the css file
      // to: {
      //   namespace: ['home'],
      // },
      sync: true,
      beforeOnce() {},
      once() {
        //with css plugin, this will not run
      },
      afterOnce() {},
      leave() {},
      enter() {},
    },
    {
      name: 'fade',
      from: {
        // set of conditions to be fulfilled to play the transition
        // leaving the current.container
      },
      to: {
        // set of conditions to be fulfilled to play the transition
        // entering the next.container
        namespace: ['fade'],
      },
      leave() {},
      enter() {},
    },
    {
      name: 'clip',
      sync: true, //enter and leave will happend at the same time
      from: {},
      to: {
        namespace: ['clip'],
      },
      leave() {},
      enter() {},
    },
    {
      name: 'with-cover',
      from: {},
      to: {
        namespace: ['with-cover'],
      },
      leave() {},
      enter() {},
    },
  ],
});
