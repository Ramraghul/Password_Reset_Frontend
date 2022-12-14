import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import Swal from 'sweetalert2';
import { env } from './config';

function Forgot() {
    let formik = useFormik({
        initialValues: {
            Email: ""
        },
        validate: (value) => {
            let errors = {}
            //Password;
            if (value.Email === "") {
                errors.Email = "border border-info"
            }
            return errors
        },
        onSubmit: async (User) => {
            try {
                let status = await axios.post(`${env.API}/Reset`, User);
                console.log(status);
                Swal.fire({ title: 'Email Send', text: 'Please Check Your Email', icon: 'success', confirmButtonText: 'Login' });
            } catch (error) {
                Swal.fire({ title: "User Not Found", icon: 'warning', confirmButtonText: 'Try Again' });
                console.log(error);
            }
        }
    });
    return (
        <>
            <span className='container'>
                <span className='row d-flex align-content-center justify-content-center mt-5'>
                    <span className='col-lg-5 col-md-7 col-sm-9 border rounded rounded check mt-5'>

                        {/* -------------------Forget form-------------------- */}
                        <form className='mt-5' onSubmit={formik.handleSubmit}>
                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input type="email" id="registerEmail" className="form-control bg-transparent text-white" value={formik.values.Email} onChange={formik.handleChange} name="Email" required />
                                <label className="form-label text-white" for="registerEmail">Enter Register Email ID</label>
                            </div>
                            {/* <!-- Submit button --> */}
                            <button type="submit" className="btn btn-primary btn-sm btn-block mb-3">Send Reset Link</button>
                        </form>
                    </span>
                </span>
            </span>
        </>
    )
}

export default Forgot