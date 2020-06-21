import React, { Component } from "react";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";

// MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";

// Redux stuff
import { connect } from "react-redux";
import { compose } from "recompose";
import { editUserDetails } from "../redux/actions/userActions";

const styles = {
	textField: {
		margin: "10px auto 10px auto ",
	},
	button: {
		float: "right",
	},
};

class EditDetails extends Component {
	state = {
		bio: "",
		website: "",
		location: "",
		open: false,
	};

	handleOpen = () => {
		this.setState({
			open: true,
		});
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	mapUserDetailsToState = credentials => {
		this.setState({
			bio: credentials.bio ? credentials.bio : "",
			website: credentials.website ? credentials.website : "",
			location: credentials.location ? credentials.location : "",
		});
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location,
		};

		this.props.editUserDetails(userDetails);
		this.handleClose();
	};
	render() {
		const { classes } = this.props;
		return (
			<>
				<MyButton
					tip="Edit details"
					onClick={this.handleOpen}
					btnClassName={classes.button}
				>
					<EditIcon color="primary" />
				</MyButton>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								rows="3"
								placeholder="A short bio about yourself"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="website"
								type="text"
								label="Website"
								placeholder="Your personal/professional website"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="location"
								type="text"
								label="Location"
								placeholder="Where you live"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
}

const mapStateToProps = state => ({
	credentials: state.user.credentials,
});
const mapActionToProps = {
	editUserDetails,
};

EditDetails.propTypes = {
	credentials: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	editUserDetails: PropTypes.func.isRequired,
};

export default compose(
	connect(mapStateToProps, mapActionToProps),
	withStyles(styles),
)(EditDetails);
