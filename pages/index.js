import { useState } from 'react';
import { useRouter } from 'next/router'
import Layout from "../components/Layout";
import { addNewUser } from "./../redux/user/userSlice"
import { useDispatch } from 'react-redux'

const Home = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	const play = e => {
		e.preventDefault();

		dispatch(addNewUser({
			name: name
		}));

		//redirect to my pokemon
		router.push('/my-pokemon');
	}

	return (
		<Layout>
			<div className="container" style={{
				height: "100vh",
			}}>
				<div className="row justify-content-center align-items-center h-100">
					<div className="col-sm-12 col-md-10 col-lg-8">
						<div style={{
							backgroundColor: "#fff",
							boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
						}}>
							<div className="row">
								<div className="col-sm-12 col-md-6 p-5 text-center" style={{
									background: "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url(https://images.unsplash.com/photo-1637158881671-f6e4331887e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) no-repeat center center",
									borderTopLeftRadius: "10px",
									borderBottomLeftRadius: "10px",
									color: '#fff'
								}}>
									<h1>Pokeplay</h1>
									<h4>Gotta Catch 'Em All!</h4>
									<p>Discover all Pokemon and catch it as many as you can.</p>
								</div>
								<div className="col-sm-12 col-md-6 p-5" style={{
									backgroundColor: "#fff",
									borderTopRightRadius: "10px",
									borderBottomRightRadius: "10px",
								}}>
									<div className="mt-2">
										<p>Please enter your name before you can play <b>Pokeplay</b>.</p>
										<form onSubmit={play}>
											<div className='mt-3'>
												<label>Name</label>
												<input type="text" value={name} onChange={e => setName(e.target.value)} maxLength={50} placeholder="Please enter your name.." required={true} className="form-control"/>
											</div>
											<div className='mt-3'>
												<button type="submit" className="btn btn-warning w-100">Play Now!</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Home;