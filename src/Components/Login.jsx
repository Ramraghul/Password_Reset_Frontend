import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { env } from './config';
import Swal from 'sweetalert2';



function Login() {

    //Registration method;
    let formik = useFormik({
        initialValues: {
            Name: "",
            Username: "",
            Email: "",
            Password: ""
        },
        validate: (value) => {
            let errors = {}
            //Name; 
            if (value.Name === "") {
                errors.Name = "border border-info"
            }
            //Password;
            if (value.Password.length <= 8) {
                errors.Password = "border border-info"
            }
            return errors
        },
        onSubmit: async (User) => {
            try {
                await axios.post(`${env.API}/Registration`, User);
                Swal.fire({ title: 'Welcome', text: 'Thankyou for Registration', icon: 'success', confirmButtonText: 'Cool' });
            } catch (error) {
                Swal.fire({ title: `${error.response.data.Message}`, icon: 'warning', confirmButtonText: 'Try Again' });
            }
        }
    });

    //Login Method;

    let login = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },
        validate: (value) => {
            let errors = {};
            //Email; 
            if (value.Email === "") {
                errors.Email = "border border-info"
            }
            //Password;
            if (value.Password.length <= 8) {
                errors.Password = "border border-info"
            }
            return errors
        },
        onSubmit: async (Login) => {

            try {
                let login = await axios.post(`${env.API}/Login`, Login);
                console.log(login.data);
                let watchman = login.data;
                if (watchman.token) {
                    Swal.fire({ title: 'Welcome', text: 'Successfully Logged', icon: 'success', confirmButtonText: 'Cool' });
                } else {
                    Swal.fire({ title: `${watchman.Message}`, icon: 'warning', confirmButtonText: 'Try Again' });
                }
            } catch (error) {
                Swal.fire({ title: `${error.response.data.Message}`, icon: 'warning', confirmButtonText: 'Try Again' });
            }
        }
    })
    return (
        <>
            <span className='container'>
                <span className='row d-flex align-content-center justify-content-center mt-5'>
                    <span className='col-lg-5 col-md-7 col-sm-9 border rounded rounded check mt-5'>

                        {/* <!-- Pills navs --> */}
                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                                    aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                                    aria-controls="pills-register" aria-selected="false">Register</a>
                            </li>
                        </ul>
                        {/* <!-- Pills navs --> */}

                        {/* <!-- Pills content --> */}
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                <form onSubmit={login.handleSubmit}>
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="email" id="loginName" className={`form-control bg-transparent text-white ${login.errors.Email}`} value={login.values.Email} onChange={login.handleChange} name="Email" required />
                                        <label className="form-label text-white" for="loginName">Email or username</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="password" id="loginPassword" className={`form-control bg-transparent text-white ${login.errors.Password}`} value={login.values.Password} onChange={login.handleChange} name="Password" />
                                        <label className="form-label text-white" for="loginPassword">Password</label>
                                    </div>

                                    {/* <!-- 2 column grid layout --> */}
                                    <div className="row mb-4">
                                        <div className="col-md-6 d-flex justify-content-center">
                                            {/* <!-- Checkbox --> */}
                                            <div className="form-check mb-3 mb-md-0">
                                                <input className="form-check-input text-white" type="checkbox" disabled={!login.isValid} value="" id="loginCheck" />
                                                <label className="form-check-label" for="loginCheck"> Remember me </label>
                                            </div>
                                        </div>

                                        <div className="col-md-6 d-flex justify-content-center">
                                            {/* <!-- Simple link --> */}
                                            <Link to={"Forgot"} className='text-white'>Forgot password?</Link>
                                        </div>
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button type="submit" className="btn btn-primary btn-block mb-4" disabled={!login.isValid}>Sign in</button>


                                    {/* <!-- Register buttons --> */}
                                    {/* <div className="text-center">
                                        <p>Not a member? <a href="#!" className='text-warning'>Register</a></p>
                                    </div> */}
                                </form>
                            </div>

                            {/* -------------------Registration page-------------------- */}

                            <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                                <form onSubmit={formik.handleSubmit}>
                                    {/* <!-- Name input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="text" id="registerName" className={`form-control bg-transparent text-white ${formik.errors.Name}`} value={formik.values.Name} onChange={formik.handleChange} name="Name" />
                                        <label className={`form-label text-white`} for="registerName">Name</label>
                                    </div>

                                    {/* <!-- Username input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="text" id="registerUsername" className="form-control bg-transparent text-white" value={formik.values.Username} onChange={formik.handleChange} name="Username" />
                                        <label className="form-label text-white" for="registerUsername">Username</label>
                                    </div>

                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="email" id="registerEmail" className="form-control bg-transparent text-white" value={formik.values.Email} onChange={formik.handleChange} name="Email" required />
                                        <label className="form-label text-white" for="registerEmail">Email</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="password" id="registerPassword" className={`form-control bg-transparent text-white ${formik.errors.Password}`} value={formik.values.Password} onChange={formik.handleChange} name="Password" />
                                        <label className="form-label text-white" for="registerPassword">Password</label>
                                    </div>

                                    {/* <!-- Repeat Password input --> */}
                                    {/* <div className="form-outline mb-4">
                                        <input type="password" id="registerRepeatPassword" className="form-control bg-transparent text-white" />
                                        <label className="form-label text-white" for="registerRepeatPassword">Repeat password</label>
                                    </div> */}

                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" disabled={!formik.isValid} type="checkbox" value="" id="registerCheck"
                                            aria-describedby="registerCheckHelpText" />
                                        <label className="form-check-label" for="registerCheck">
                                            I have read and agree to the terms
                                        </label>
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button type="submit" disabled={!formik.isValid} className="btn btn-primary btn-block mb-3">Sign in</button>
                                </form>
                            </div>
                        </div>
                        {/* <!-- Pills content --> */}
                    </span>
                </span>
            </span>
        </>
    )
}

export default Login