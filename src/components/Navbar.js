import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import PostScream from "./PostScream";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Redux stuff
import { connect } from "react-redux";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<>
							<PostScream />
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon />
								</MyButton>
							</Link>
							<MyButton tip="Notifications">
								<Notifications />
							</MyButton>
						</>
					) : (
						<>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = state => ({
	authenticated: state.user.authenticated,
});

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
