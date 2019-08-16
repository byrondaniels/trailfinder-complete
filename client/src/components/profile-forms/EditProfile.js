import React, { useState, useMemo, useCallback } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import ImageChoice from "./ImageChoice";

const EditProfile = ({
    createProfile, getCurrentProfile,
    profile: { profile, loading },
    history,
}) => {
    const [formData, setFormData] = useState({
        blog: "",
        location: "",
        status: "",
        skills: "",
        bio: "",
        externalImg: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const [displayImageEntry, toggleImageEntry] = useState(false);
    const twitterURL = "https://www.twitter.com/";
    const facebookURL = "https://www.facebook.com/";
    const linkedinURL = "https://www.linkedin.com/";
    const youtubeURL = "https://www.youtube.com/";
    const instagramURL = "https://www.instagram.com/";
    const {
        blog,
        location,
        status,
        skills,
        bio,
        externalImg,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onChangeImg = imageUrl =>
        setFormData({ ...formData, "externalImg": imageUrl });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };



    const setInitialFormData = useCallback(() => {
        setFormData({
            blog: loading || !profile.blog ? "" : profile.blog,
            location: loading || !profile.location ? "" : profile.location,
            status: loading || !profile.status ? "" : profile.status,
            skills: loading || !profile.skills ? "" : profile.skills.join(','),
            bio: loading || !profile.bio ? "" : profile.bio,
            externalImg: loading || !profile.externalImg ? "" : profile.externalImg,
            twitter: loading || !profile.social ? "" : profile.social.twitter,
            facebook: loading || !profile.social ? "" : profile.social.facebook,
            linkedin: loading || !profile.social ? "" : profile.social.linkedin,
            youtube: loading || !profile.social ? "" : profile.social.youtube,
            instagram: loading || !profile.social ? "" : profile.social.instagram,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useMemo(() => { getCurrentProfile(); setInitialFormData() },
        [getCurrentProfile, setInitialFormData]);

    return !loading && profile !== null ? (
        <div className="res-width">
            <h1 className='large text-primary'>Edit Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Edit your profile below
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <select name='status' value={status} onChange={e => onChange(e)}>
                        <option value='0'>* Select Experience Level</option>
                        <option value='Novice'>Novice</option>
                        <option value='Junior'>Junior</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Senior'>Senior</option>
                        <option value='Trailblazer'>Trailblazer</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        Give us an idea of your experience level
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='blog'
                        name='blog'
                        value={blog}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Could be your own or a favorite blog
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        City, Country (Where you currently live)
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Skills'
                        name='skills'
                        value={skills}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Please use comma separated values (eg. Scrambling, Backcountry, Mountaineering, TrailRunning)
                    </small>
                </div>

                <div className='form-group'>
                    <textarea
                        placeholder='A short bio of yourself'
                        name='bio'
                        value={bio}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Tell us a little about yourself</small>
                </div>
                <div className='my-2'>
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type='button'
                        className='btn btn-light'
                    >
                        Change Social Network Links
                    </button>
                </div>
                <>
                    <div className='form-group social-input'>
                        <i className='fab fa-twitter fa-2x' />
                        <span className='form-text'>{twitterURL}</span>
                        <input
                            type='text'
                            name='twitter'
                            value={twitter}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group social-input'>
                        <i className='fab fa-facebook fa-2x' />
                        <span className='form-text'>{facebookURL}</span>
                        <input
                            type='text'
                            name='facebook'
                            value={facebook}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group social-input'>
                        <i className='fab fa-youtube fa-2x' />
                        <span className='form-text'>{youtubeURL}</span>
                        <input
                            type='text'
                            name='youtube'
                            value={youtube}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group social-input'>
                        <i className='fab fa-linkedin fa-2x' />
                        <span className='form-text'>{linkedinURL}</span>
                        <input
                            type='text'
                            name='linkedin'
                            value={linkedin}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group social-input'>
                        <i className='fab fa-instagram fa-2x' />
                        <span className='form-text'>{instagramURL}</span>
                        <input
                            type='text'
                            name='instagram'
                            value={instagram}
                            onChange={e => onChange(e)}
                        />
                    </div>
                </>
                <small className='form-text'>{externalImg && "An image is set for your profile"}</small>
                <div className='my-2'>
                    <button
                        onClick={() => toggleImageEntry(!displayImageEntry)}
                        type='button'
                        className='btn btn-light'
                    >
                        Pick A New Image For Your Profile
                    </button>
                    <span>Optional</span>
                </div>

                {displayImageEntry &&
                    <ImageChoice
                        onChangeImg={onChangeImg}
                        externalImg={externalImg}
                    />}
                <input
                    type='submit'
                    className='btn btn-primary my-1'
                />
                <Link
                    className='btn btn-light my-1'
                    to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </div>
    ) : <Redirect to='/dashboard' />
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ profile: state.profile, });

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile },
)(withRouter(EditProfile));