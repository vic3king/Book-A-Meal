import React, { Component } from 'react';
import NavBar from '../../Layout/NavBar/NavBar.js';
import styles from './style.scss';

/**
 * @class Welcome
 */
class Welcome extends Component {
  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const animateHungry = () => {
      this.hungryElements.forEach((letterElm, index) => {
        setTimeout(() => letterElm.classList.toggle(styles.bounceIn), index * 250);
      });
    };
    this.animationInterval = setInterval(animateHungry, 2500);
  }

  /**
   * @returns {undefined}
   */
  componentWillUnmount() {
    clearInterval(this.animationInterval);
  }

  hungryElements = [];

  /**
   * @returns {JSX} - React JSX
   */
  render() {
    return (
      <div className={styles.welcome}>
        <NavBar backgroundColor="#fd49119e" />
        <div className={styles.mask}>
          <div className={styles.intro}>
            <span className={styles.text}>
              <span className={styles.hungry}>
                {
                  ('Hungry!?,').split('').map((letter, index) => (
                    <i
                      key={letter}
                      ref={elm => this.hungryElements[index] = elm}
                      className={styles.hungryLetter}
                    >
                      {letter}
                    </i>
                  ))
                }
              </span>
              <br />
              Book a meal on the go...
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
