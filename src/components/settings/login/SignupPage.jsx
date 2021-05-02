import React, { useState, useRef } from 'react';
import { useAuth } from 'contexts/AuthContext';
import 'css/settings/signup.scss';

const SignupPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { signupEmail } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(passwordRef.current.value !== passwordConfirmRef.current.value){
			return setError("passwords don't match")
		}

		try {
			setError("");
			setLoading(true);
			await signupEmail(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<div className="content-box settings signup">
			{error && <span className="red">{error}</span>}
			<form onSubmit={handleSubmit}>
				<label>ელექტრონული ფოსტა</label>
				<input type="email" ref={emailRef} id="email" placeholder="your@email.com" required />
				
				<label>პაროლი</label>
				<input type="password" ref={passwordRef} id="password" placeholder="პაროლი" required />

				<label>დაადასტურეთ პაროლი</label>
				<input type="password" ref={passwordConfirmRef} id="password-confirm" placeholder="დაადასტურეთ პაროლი" required />

				<input type="submit" disabled={loading} id="submit" value="რეგისტრაცია"/>
			</form>
		</div>
	)
};

export default SignupPage;