import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { toastr } from 'react-redux-toastr';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* MUI Icons */
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';

/* Actions */
import { uploadProfileImage } from '../../../userActions';

const styles = theme => ({
	grid: {
		padding: '1.3em'
	},
	media: {
		height: 250
	}
});

class PhotoUploadContainer extends Component {
	state = {
		files: [],
		fileName: '',
		cropResult: null,
		image: {}
	}

	onDrop = files => {
		this.setState({
			files,
			fileName: files[0].name
		})
	}

	cropImage = () => {
		if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
			return;
		}

		this.refs.cropper.getCroppedCanvas().toBlob(blob => {
			let imageUrl = URL.createObjectURL(blob);

			this.setState({
				cropResult: imageUrl,
				image: blob
			})
		}, 'image/jpeg');
	}

	cancelCrop = () => {
		this.setState({
			files: [],
			image: {}
		});
	}

	uploadImage = async () => {
		try {
			await this.props.uploadProfileImage(this.state.image, this.state.fileName);
			this.cancelCrop();
			toastr.success('Success!', 'Photo has been uplaoded');
		}
		catch (error) {
			console.log(error)
			toastr.error('Error', error.message);
		}
	}

	render() {
		const { classes, loading } = this.props;
		return (
			<Grid
				spacing={24}
				alignItems="center"
				direction="row"
				justify="center"
				container
				className={classes.grid}
			>
				<Grid item xs={12} md={6} lg={4}>
					<Typography variant="subtitle1">
						Step 1 - Add Photo
					</Typography>
					<Card>
						<Dropzone style={{ width: '100%', height: '290px' }} onDrop={this.onDrop} multiple={false}>
							<CardContent style={{ textAlign: 'center', paddingTop: '5em' }}>
								<IconButton>
									<CloudUploadIcon />
								</IconButton>
								<Typography variant="subtitle1">
									Drop imag here or click to add
							</Typography>
							</CardContent>
						</Dropzone>
					</Card>

				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					{
						this.state.files[0] &&
						<React.Fragment>
							<Typography variant="subtitle1">
								Step 2 - Resize Photo
							</Typography>
							<Card className={classes.card}>
								<CardActionArea>
									<Cropper
										style={{ height: '290px', width: '100%' }}
										ref="cropper"
										src={this.state.files[0].preview}
										aspectRation={1}
										viewMode={0}
										dragMode='move'
										guides={false}
										scalable={true}
										cropBoxMovable={true}
										cropBoxResizable={true}
										crop={this.cropImage}
									/>
								</CardActionArea>
							</Card>
						</React.Fragment>
					}
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					{
						this.state.files[0] &&
						this.state.cropResult &&
						<React.Fragment>
							<Typography variant="subtitle1">
								Step 3 - Upload Photo
							</Typography>
							<Card className={classes.card}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={this.state.cropResult}
									/>
								</CardActionArea>
								<CardActions>
									<Button
										onClick={this.uploadImage}
										fullWidth
										variant="contained"
										size="small"
										color="primary"
										disabled={loading}
									>
										Upload
								</Button>
									<Button
										onClick={this.cancelCrop}
										fullWidth
										variant="contained"
										size="small"
										color="secondary"
										disabled={loading}
									>
										Cancel
								</Button>
								</CardActions>
							</Card>
						</React.Fragment>
					}
				</Grid>
			</Grid>
		)
	}
}

const actions = {
	uploadProfileImage
}

export default compose(
	connect(null, actions),
	withStyles(styles)
)(PhotoUploadContainer);