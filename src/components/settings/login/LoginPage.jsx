import React, { useState, useRef } from 'react';
import { useAuth } from 'contexts/AuthContext';

import 'css/settings/signup.scss';

const LoginPage = ({switchTheme}) => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { signinEmail } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signinEmail(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("Failed to sign in");
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

				<input type="submit" disabled={loading} id="submit" value="შესვლა"/>
			</form>
		</div>
	)
};

export default LoginPage;