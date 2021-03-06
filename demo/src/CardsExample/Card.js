import React, { PureComponent } from "react"
import { Flipped } from "../../../src"
import anime from "animejs"

class Card extends PureComponent {
  hideElements = (el, startId) => {
    if (startId !== "focusedUser") return
    const elements = [].slice.apply(el.querySelectorAll("*[data-fade-in]"))
    elements.forEach(el => (el.style.opacity = "0"))
    el.style.zIndex = 2
  }
  animateIn = (el, startId) => {
    if (startId !== "focusedUser") return
    anime({
      targets: el.querySelectorAll("*[data-fade-in]"),
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 250,
      easing: "easeOutSine",
      delay: (d, i) => i * 75
    })
    el.style.zIndex = 1
  }
  render() {
    const { parentFlipId, d, i, setFocusedIndex } = this.props
    console.log("re-rendering")
    return (
      <li key={parentFlipId}>
        <Flipped
          flipId={parentFlipId}
          onStart={this.hideElements}
          onComplete={this.animateIn}
          componentId="gridItem"
        >
          <div
            className="gridItem"
            onClick={() => setFocusedIndex(i)}
            role="button"
          >
            <Flipped
              inverseFlipId={parentFlipId}
              componentIdFilter={["focusedUser"]}
            >
              <div>
                <h2 className="gridItemTitle" data-fade-in>
                  {d.name}
                </h2>
                <Flipped
                  flipId={`${parentFlipId}-avatar`}
                  componentIdFilter="focusedUserAvatar"
                >
                  <img
                    src={d.avatar}
                    alt={`user profile for ${d.name}`}
                    className="gridItemAvatar"
                  />
                </Flipped>
                <h2 className="gridItemJob" data-fade-in>
                  {d.job}
                </h2>

                <Flipped
                  flipId={`${parentFlipId}-background`}
                  componentIdFilter="focusedUserBackground"
                >
                  <div
                    className="gridItemBackground"
                    style={{ backgroundColor: d.color }}
                  />
                </Flipped>
              </div>
            </Flipped>
          </div>
        </Flipped>
      </li>
    )
  }
}

export default Card
