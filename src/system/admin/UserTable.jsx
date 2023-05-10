import {handleParseBufferImage} from "../../utils/helpers";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import Spinner from "../../components/spin/Spinner";
import {useGetUsersQuery} from "../../redux/api/userApi";

const UserTable = () => {
	const {data, isFetching} = useGetUsersQuery();
	return (
		<div className="mt-10">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				{isFetching ? (
					<Spinner />
				) : (
					<>
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3">
										Email
									</th>
									<th scope="col" className="px-6 py-3">
										First Name
									</th>
									<th scope="col" className="px-6 py-3">
										Role
									</th>
									<th scope="col" className="px-6 py-3">
										Address
									</th>
									<th scope="col" className="px-6 py-3">
										Avatar
									</th>
									<th scope="col" className="px-6 py-3">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((user, index) => {
									let imageBase64 = "";
									if (user?.image) {
										imageBase64 = handleParseBufferImage(user?.image);
									}
									return (
										<tr
											key={index}
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
											>
												{user.email}
											</th>
											<td className="px-6 py-4">{user.firstName}</td>
											<td className="px-6 py-4">{user.roleId}</td>
											<td className="px-6 py-4">{user.address}</td>
											<td className="px-6 py-4">
												<img
													className="w-10 h-10 rounded-full"
													src={imageBase64}
													alt="Rounded avatar"
												/>
											</td>

											<td className="px-6 py-4 text-right">
												<div className="flex flex-start gap-5">
													<span className="inline-block cursor-pointer w-7 h-7">
														<AiFillEdit size={20} className="text-blue-500" />
													</span>
													<span className="inline-block cursor-pointer w-7 h-7">
														<AiFillDelete size={20} className="text-red-500" />
													</span>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
};

export default UserTable;
