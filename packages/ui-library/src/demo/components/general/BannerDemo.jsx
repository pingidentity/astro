import React from "react";
import Banner from "../../../components/general/Banner";
import HR from "ui-library/lib/components/general/HR";
import Button, { buttonTypes } from "../../../components/buttons/Button";

/**
* @name BannerDemo
* @memberof Banner
* @desc A demo for Banner
*/

class BannerDemo extends React.Component {
  state = {
      visible: true
  };

  _onToggle = () => {
      this.setState({
          visible: !this.state.visible
      });
  };

  _onClick = () => {
      console.log("Clicked");
  };

  render() {
      return (
          <div>
              <p>
                  Banner with action button and close banner functionality.
              </p>
              <HR />
              <h3>With close and icon</h3>
              <Banner
                  data-id="example-banner1"
                  showClose={true}
                  fullWidth={true}
                  icon="shield"
                  title="Add MFA access for your Users!"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                  actionText="Unlock"
                  actionIcon="open-lock"
                  onClick={this._onClick}
                  onClose={this._onToggle}
                  visible={this.state.visible}
              />
              {!this.state.visible &&
                <Button
                    data-id="btn"
                    label="Show banner"
                    onClick={this._onToggle}
                    type={buttonTypes.LINK}
                />
              }
              <HR />
              <h3>With close and no action</h3>
              <Banner
                  data-id="example-banner1"
                  showClose={true}
                  fullWidth={true}
                  icon="shield"
                  title="Add MFA access for your Users!"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                  onClose={this._onToggle}
                  visible={this.state.visible}
              />
              {!this.state.visible &&
                <Button
                    data-id="btn"
                    label="Show banner"
                    onClick={this._onToggle}
                    type={buttonTypes.LINK}
                />
              }
              <HR />
              <h3>Without close and without icon</h3>
              <Banner
                  data-id="example-banner3"
                  title="Add MFA access for your Users!"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      Sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                  actionText="Unlock"
                  actionIcon="open-lock"
                  onClick={this._onClick}
                  fullWidth={true}
              />
              <HR />
              <h3>With close and icon not full width</h3>
              <Banner
                  data-id="example-banner4"
                  showClose={true}
                  icon="shield"
                  title="Add MFA access for your Users!"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                  actionText="Unlock"
                  actionIcon="open-lock"
                  onClick={this._onClick}
                  onClose={this._onToggle}
                  visible={this.state.visible}
              />
              {!this.state.visible &&
                <Button
                    data-id="btn"
                    label="Show banner"
                    onClick={this._onToggle}
                    type={buttonTypes.LINK}
                />
              }
              <HR />
              <h3>Without close and no action</h3>
              <Banner
                  data-id="example-banner5"
                  title="Add MFA access for your Users!"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Sit amet,
                     consectetur adipiscing elit, sed do eiusmod tempor"
                  onClick={this._onClick}
                  fullWidth={true}
              />
              <HR />
              <h3>With custom content</h3>
              <Banner
                  data-id="example-banner6"
                  icon="shield"
              >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.&nbsp;
                  <Button
                      data-id="btn"
                      label="some link"
                      onClick={this._onClick}
                      type={buttonTypes.LINK}
                  />
              </Banner>
          </div>
      );
  }
}

module.exports = BannerDemo;
