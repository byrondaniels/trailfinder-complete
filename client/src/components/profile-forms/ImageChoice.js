import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import classNames from 'classnames';
import '../../style.css'
import { getRandomUnsplashImages } from "../../actions/profile"

const selectionChoices = ["Dog", "Cat", "Leaf", "Sun", "Ocean", "Cheese", "Robot", "Person"]

const ImageChoice = ({ images, getRandomUnsplashImages, onChangeImg, externalImg }) => {

    useEffect(() => {
        getRandomUnsplashImages(selectionChoices[0]);
    }, [getRandomUnsplashImages]);

    return (
        <Fragment>
            <div className="word-container" >
                <div className="indiv-word">Choose an image type</div>
                {selectionChoices.map((word, index) => {
                    return (
                        <div className="indiv-word sel-option" onClick={() => { getRandomUnsplashImages(word) }} key={index} >{word}</div>
                    )
                })} </div>
            <div className="images-container">
                {images ? images.map((image, index) => {
                    return (
                        <div className="img-wrap" key={index} name="externalImg" onClick={() => { onChangeImg(image.small) }}>
                            <span className={classNames({
                                'sel-border': image.small === externalImg
                            })}>
                                < img
                                    className="indiv-img"
                                    src={image.small}
                                    alt="Error"
                                />
                            </span>
                        </div>)
                }) : <Spinner />}
            </div>
        </Fragment>
    )
};

ImageChoice.propTypes = {
    getRandomUnsplashImages: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    images: state.profile.images
});


export default connect(mapStateToProps,
    { getRandomUnsplashImages }
)(ImageChoice);