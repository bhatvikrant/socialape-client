import React, { Component } from "react";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI stuff
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

// Redux stuff
import { connect } from "react-redux";
import { compose } from "recompose";

const styles = theme => ({
	invisibleSeparator: {
		border: "none",
		margin: 4,
	},
	visibleSeparator: {
		width: "100%",
		borderBottom: "1px solid rgba(0,0,0,0.1)",
		marginBottom: 20,
	},
	paper: {
		padding: 20,
	},
	profile: {
		"& .image-wrapper": {
			"textAlign": "center",
			"position": "relative",
			"& button": {
				position: "absolute",
				top: "80%",
				left: "70%",
			},
		},
		"& .profile-image": {
			width: 200,
			height: 200,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "50%",
		},
		"& .profile-details": {
			"textAlign": "center",
			"& span, svg": {
				verticalAlign: "middle",
			},
			"& a": {
				color: "#00bcd4",
			},
		},
		"& hr": {
			border: "none",
			margin: "0 0 10px 0",
		},
		"& svg.button": {
			"&:hover": {
				cursor: "pointer",
			},
		},
	},
	buttons: {
		"textAlign": "center",
		"& a": {
			margin: "20px 10px",
		},
	},
});

class Profile extends Component {
	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated,
			},
		} = this.props;

		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img src={imageUrl} alt="profile" className="profile-image" />
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								color="primary"
								variant="h5"
							>
								@{handle}
							</MuiLink>
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<>
									<LocationOn color="primary" /> <span>{location}</span>
									<hr />
								</>
							)}
							{website && (
								<>
									<LinkIcon color="primary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{" "}
										{website}
									</a>
									<hr />
								</>
							)}
							<CalendarToday color="primary" />{" "}
							<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
						</div>
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No profile found, please login again
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="secondary"
							component={Link}
							to="/signup"
						>
							Signup
						</Button>
					</div>
				</Paper>
			)
		) : (
			<p>loading...</p>
		);
		return profileMarkup;
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default compose(connect(mapStateToProps), withStyles(styles))(Profile);
