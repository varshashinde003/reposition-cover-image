import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // get value of converPosition from localstorage
      // if the value does not exist assign it to 0
      converPosition: localStorage.getItem("converPosition") || 0,
      isImageEditable: false,
    };
    this.coverImageRef = React.createRef();
    this.toggleImageEditable = this.toggleImageEditable.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.setCoverImagePosition = this.setCoverImagePosition.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);
  }

  /**
   * This handler will toggle the Update Cover Image i.e to set the if the the cover image is editable or not
   */
  toggleImageEditable() {
    this.setState({
      isImageEditable: !this.state.isImageEditable,
    });
  }

  /**
   * This handler will check if the cover image is editable or not if true attach the listeners and the mouse position.
   */
  handleMouseDown(e) {
    if (this.state.isImageEditable) {
      this.initialPos = e.clientY;
      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.elementDrag;
    }
  }

  /**
   * This handler will set the image with respect to the browser window depending upon the drag location.
   */
  elementDrag(e) {
    e.preventDefault();
    this.newPos = this.initialPos - e.clientY;
    this.initialPos = e.clientY;
    this.setState({
      converPosition: this.coverImageRef.current.offsetTop - this.newPos + "px",
    });
  }

  /**
   * This handler will store the current location based on the values received from elementDrag funtion in the localstorage
   * After that it will set the editable image variable to false which will then hide the save and cancle buttons from the screen.
   */
  setCoverImagePosition() {
    localStorage.setItem("converPosition", this.state.converPosition);
    this.setState({
      isImageEditable: false,
    });
  }

  /**
   * This handler will remove all the listeners.
   */
  closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  /**
   * Further enhancements can be done:
   * 1. Adding onTouch handlers
   * 2. Add media queries based on the devices
   * 3. Add Webpack 
   * 4. Rewrite using React Hooks
   */

  render() {
    const { isImageEditable, converPosition } = this.state;
    return (
      <div id="app">
        <div className="fluid-container">
          <div
            className={`cover-image-wrapper ${
              isImageEditable ? "cursor-grab" : "cursor-normal"
            }`}
          >
            <div
              className="drag-helper"
              style={{ top: converPosition }}
              onMouseDown={this.handleMouseDown}
              ref={this.coverImageRef}
            >
              <img
                className="drag-helper-icon w-100"
                src="/assets/images/cover-image.jpg"
                alt="cover"
              />

              {isImageEditable ? (
                <>
                  <span className="btn-update update-info cursor-normal">
                    &#8661; Click and Drag to Reposition
                  </span>
                  <div className="update-cover-image-wrapper">
                    <button
                      className="btn btn-warning mr-3"
                      onClick={this.setCoverImagePosition}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={this.toggleImageEditable}
                    >
                      Cancle Changes
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="btn-update"
                  onClick={this.toggleImageEditable}
                >
                  <i className="fa fa-camera" aria-hidden="true"></i> Update
                  Cover Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
