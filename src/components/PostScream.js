import React, { Component } from "react";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";

// MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Redux stuff
import { connect } from "react-redux";
import { compose } from "recompose";
import { postScream } from "../redux/actions/dataActions";

const styles = {
	textField: {
		margin: "10px auto 10px auto ",
	},
	submitButton: {
		position: "relative",
	},
	progressSpinner: {
		position: "absolute",
	},
	closeButton: {
		position: "absolute",
		left: "90%",
		top: "10%",
	},
};

class PostScream extends Component {
	state = { open: false, body: "", errors: {} };

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.handleClose();
		}
	}

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false, body: "", errors: {} });
	};
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.postScream({ body: this.state.body });
	};

	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading },
		} = this.props;
		return (
			<>
				<MyButton onClick={this.handleOpen} tip="Post a Scream!">
					<AddIcon />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<MyButton
						tip="close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</MyButton>
					<DialogTitle>Post a new Scream</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="SCREAM!!"
								multiline
								rows="3"
								placeholder="Scream at you fellow apes"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const MSP = state => ({
	UI: state.UI,
});

export default compose(
	connect(MSP, { postScream }),
	withStyles(styles),
)(PostScream);
