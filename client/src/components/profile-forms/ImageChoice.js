import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import classNames from 'classnames';
import '../../style.css'
import { getRandomUnsplashImages } from "../../actions/profile"

const selectionChoices = ["Dog", "Cat", "Leaf", "Sun", "Ocean", "Cheese", "Robot", "Person"]

const ImageChoice = ({ images, getRandomUnsplashImages, onChangeImg, externalImg }) => {

    useEffect(() => { getRandomUnsplashImages(selectionChoices[0]) }, [getRandomUnsplashImages]);

    return (
        <>
            <div className="word-container" >
                <div className="indiv-word">Choose an image type</div>
                {selectionChoices.map((word, index) => {
                    return (
                        <div
                            className="indiv-word sel-option"
                            key={index}
                            onClick={() => { getRandomUnsplashImages(word) }}
                        >{word}</div>)
                })}
            </div>

            <div className="images-container">
                {images ? images.map((image, index) => {
                    return (
                        <div
                            key={index}
                            name="externalImg"
                            onClick={() => { onChangeImg(image.small) }}>
                            <div className={
                                classNames({
                                    "img-wrap": image.small !== externalImg
                                })}>
                                <div
                                    className='indiv-img'
                                    style={{ backgroundImage: `url(${image.small})` }}
                                />
                            </div>
                        </div>)
                }) : <Spinner />}
            </div>
        </>
    )
};

ImageChoice.propTypes = {
    getRandomUnsplashImages: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({ images: state.profile.images });

export default connect(mapStateToProps,
    { getRandomUnsplashImages }
)(ImageChoice);