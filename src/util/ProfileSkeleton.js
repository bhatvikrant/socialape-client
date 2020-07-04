import React from "react";

import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = {
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
	handle: {
		height: 20,
		backgroundColor: "#00bcd4",
		width: 60,
		margin: "0 auto 7px auto",
	},
	fullLine: {
		height: 15,
		width: "100%",
		marginBottom: 10,
		backgroundColor: "rgba(0,0,0,0.6)",
	},
	halfLine: {
		height: 15,
		width: "50%",
		marginBottom: 10,
		backgroundColor: "rgba(0,0,0,0.6)",
	},
};

const ProfileSkeleton = props => {
	const { classes } = props;
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={NoImg} alt="profile" className="profile-image" />
					<hr />
					<div className="profile-details">
						<div className={classes.handle} />
						<hr />
						<div className={classes.fullLine} />
						<div className={classes.fullLine} />
						<hr />
						<LocationOn color="primary" />
						<span>Location</span>
						<hr />
						<LinkIcon color="primary" /> https://website.com
						<hr />
						<CalendarToday color="primary" /> Joined date
					</div>
				</div>
			</div>
		</Paper>
	);
};

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
