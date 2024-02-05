import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import screenfull from "screenfull";
import Tooltip from "@material-ui/core/Tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import { collapsedSidebarAction } from "Actions";
import { getAppLayout } from "Helpers/helpers";
import Notifications from "./Notifications";
import ChatSidebar from "./ChatSidebar";
import DashboardOverlay from "../DashboardOverlay/DashboardOverlay";
import LanguageProvider from "./LanguageProvider";
import SearchForm from "./SearchForm";
import QuickLinks from "./QuickLinks";
import MobileSearchForm from "./MobileSearchForm";
import Cart from "./Cart";
import IntlMessages from "Util/IntlMessages";

class Header extends Component {
  state = {
    customizer: false,
    isMobileSearchFormVisible: false,
  };

  onToggleNavCollapsed = (event) => {
    const val = !this.props.navCollapsed;
    this.props.collapsedSidebarAction(val);
  };

  openDashboardOverlay(e) {
    var el = document.getElementsByClassName("dashboard-overlay")[0];
    el.classList.toggle("d-none");
    el.classList.toggle("show");
    if (el.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    e.preventDefault();
  }

  closeDashboardOverlay() {
    var e = document.getElementsByClassName("dashboard-overlay")[0];
    e.classList.remove("show");
    e.classList.add("d-none");
    document.body.style.overflow = "";
  }

  toggleScreenFull() {
    screenfull.toggle();
  }

  openMobileSearchForm() {
    this.setState({ isMobileSearchFormVisible: true });
  }

  render() {
    const { isMobileSearchFormVisible } = this.state;
    const { horizontalMenu, agencyMenu, location } = this.props;
    return (
      <AppBar position="static" className="rct-header">
        <Toolbar className="d-flex justify-content-between w-100 pl-0">
          <div className="d-inline-flex align-items-center">
            {(horizontalMenu || agencyMenu) && (
              <div className="site-logo">
                <Link to="/" className="logo-mini">
                  <img
                    src={require("Assets/img/appLogo.png")}
                    className="mr-15"
                    alt="site logo"
                    width="35"
                    height="35"
                  />
                </Link>
                <Link to="/" className="logo-normal">
                  <img
                    src={require("Assets/img/appLogoText.png")}
                    className="img-fluid"
                    alt="site-logo"
                    width="67"
                    height="17"
                  />
                </Link>
              </div>
            )}
            {!agencyMenu && (
              <ul className="list-inline mb-0 navbar-left">
                {!horizontalMenu ? (
                  <li
                    className="list-inline-item"
                    onClick={(e) => this.onToggleNavCollapsed(e)}
                  >
                    <Tooltip title="Sidebar Toggle" placement="bottom">
                      <IconButton
                        color="inherit"
                        mini="true"
                        aria-label="Menu"
                        className="humburger p-0"
                      >
                        <MenuIcon />
                      </IconButton>
                    </Tooltip>
                  </li>
                ) : (
                  <li className="list-inline-item">
                    <Tooltip title="Sidebar Toggle" placement="bottom">
                      <IconButton
                        color="inherit"
                        aria-label="Menu"
                        className="humburger p-0"
                        component={Link}
                        to="/"
                      >
                        <i className="ti-layout-sidebar-left"></i>
                      </IconButton>
                    </Tooltip>
                  </li>
                )}
                
              </ul>
            )}
          </div>
          <div>
							<Link to="/app/dashboard" className="logo-mini">
								<img src={require('Assets/logo/header.png')} className="mr-15" alt="site logo" width="120" height="45" />
							</Link>
					</div>

          <ul className="navbar-right list-inline mb-0">
            <li className="list-inline-item">
              <Tooltip title="Full Screen" placement="bottom">
                <IconButton
                  aria-label="settings"
                  onClick={() => this.toggleScreenFull()}
                >
                  <i className="zmdi zmdi-crop-free"></i>
                </IconButton>
              </Tooltip>
            </li>
          </ul>
          <Drawer
            anchor={"right"}
            open={this.state.customizer}
            onClose={() => this.setState({ customizer: false })}
          >
            <ChatSidebar />
          </Drawer>
        </Toolbar>
        <DashboardOverlay onClose={() => this.closeDashboardOverlay()} />
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return settings;
};

export default withRouter(
  connect(mapStateToProps, {
    collapsedSidebarAction,
  })(Header)
);