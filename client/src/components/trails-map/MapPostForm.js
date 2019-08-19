import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import { addAPIHikePost } from '../../actions/post';

const MapPostForm = ({ displayPostForm, hidePostForm, addAPIHikePost }) => {
    const { name, url } = displayPostForm
    const [text, setText] = useState('');
    return (
        <div className="large-post-container hide-sm">


            <div className='post-form res-width fortvw'>
                <h2 className='text-primary'>{name}</h2>

                <div className='bg-primary p'>
                    <h3>Post about this hike...</h3>
                </div>

                <form
                    className='form my-1'
                    onSubmit={e => {
                        e.preventDefault();
                        addAPIHikePost({ name, url, text });
                        hidePostForm()
                    }}
                >
                    <textarea
                        name='text'
                        cols='30'
                        rows='5'
                        placeholder='This like looks awesome'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    />
                    <input type='submit'
                        className='btn btn-dark my-1 quitbtn'
                        value='Submit'
                    />
                    <button
                        className='btn btn-dark my-1 quitbtn'
                        onClick={hidePostForm}
                    >Quit</button>
                </form>

            </div>
        </div>
    )
};
// MapPostForm.propTypes = {}
export default connect(null, { addAPIHikePost })(MapPostForm);