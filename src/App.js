import React from "react"

var AppComponent = () => {

  return(
    <div>
      {/* reducer.jsのinitState */}
      <p>{this.props.count}</p>
      <input type="button" onClick={() => this.props.handleClick} />
    </div>
  )

}

export default AppComponent;