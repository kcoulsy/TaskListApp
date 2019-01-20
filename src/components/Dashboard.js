import React from 'react';

import ContainerWithNav from '../containers/ContainerWithNav';
import TaskListTable from './TaskListTable';

const Dashboard = (props) => (
	<ContainerWithNav>
		<h3>Dashboard</h3>
		<TaskListTable />
	</ContainerWithNav>
);

export default Dashboard;