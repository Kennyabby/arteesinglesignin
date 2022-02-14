# Spar Help Desk App
# Overview:
	Spar Help Desk App is a general purpose, user limited, Meteor (React) web app, built with Meteor 2.5.3.
	Spar Help Desk App allows Staffs under the authority of the Artee Group Ltd, to access (use) a variety of Spar Appsheet through
	a Click, which would have been, until now, only possible by first getting permission from the appsheet developer, who would
	then provide a use-only link to staff’s email address to access the appsheet.

# Features:
	Fully Responsive
	React 5.0.0
	Sign in with user password or Google
	Inbuilt MongoDB Database
	Add new Appsheet Link
	Delete Existing Appsheet Link (Admin)

# Git Hub Repository: 
	http://github.com/Kennyabby/arteesinglesignin.git

# Environment:
	Actively running t2.micro, 8GiB, 30GiB, 15GiB Elastic Block Store (EBS), Amazon Web Service (AWS), Elastic Cloud Computing (EC2) Ubuntu 20.04 Instance, with public 
	IP 54.247.xxx.xxx
# Meteor Installation process:
	The following command were executed in the above environment.
		sudo apt update
		sudo apt install –g npm
		npm install –g meteor
		mkdir Artee
		cd Atee
		meteor create arteesinglesignin
		cd singlesignin
		meteor run

	The –g implies a global execution. Installation is not section based.
	The folder arteesinglesignin was created in the directory
		/home/ubuntu/Artee/
	The meteor run command was executed after making a cd into directory
		/home/ubuntu/Artee/singlesignin/
		
	After creating the arteesinglesignin folder, 6 folders are automatically created:
	•	.meteor: This folder contains all libraries such as React library, and dependencies that comes with installing meteor.

	•	.git: This folder was created alongside “.meteor” folder during meteor installation, it contains everything needed to run git commands successfully.

	•	Client: As the name implies, this folder is meant for the client only. It by default contains main.css, main.html, main.jsx files, but presently contains an additional app.css file.

	•	Imports: Two folders, “ui” and “api” are present in this folder. The “ui” folder by default contains only App.jsx file, Hello.jsx, Info.jsx but presently contains, App.jsx, LinkPage.jsx, LoginPage.jsx, AddForm.jsx. These files contain react codes that are used to create the website’s user interface. The “api” folder contains by default links.js file, but presently contain links.js and userLogin.js files. The “api” folder contains files with api’s of other packages like mongodb.

	•	Server: This folder contains by default main.js file. Main.js file is the server side file that only contains server code.

	•	Tests: This folder also contains by default a file called main.js. This file can contain both server code and client code.

	•	Public: This folder is not part of the automatically generated folders after installing meteor. But it’s presence is important. Any file such as documents, images, etc… that is to be used in the construction of the user interface is placed here.

	
