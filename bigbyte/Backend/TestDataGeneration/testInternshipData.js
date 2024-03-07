const internships = [
    // Internships for Alfredo Kapoor (Apple)
    {
        body: {
            title: "Software Engineer Intern",
            company: "Apple",
            location: "Cupertino",
            pay: 30,
            category: ["Software Engineering", "Tech"],
            url: "www.apple.com/softwareengineerintern",
            referralLimit: 5,
            mentorID: "1234567890",
            description: "Work on cutting-edge projects as a Software Engineer Intern at Apple. Gain hands-on experience in developing software solutions for Apple's innovative products.",
        }
    },
    {
        body: {
            title: "Marketing Intern",
            company: "Apple",
            location: "Remote",
            pay: 25,
            category: ["Marketing", "Remote", "Communication"],
            url: "www.apple.com/marketingintern",
            referralLimit: 3,
            mentorID: "1234567890",
            description: "Join Apple's Marketing team as an intern and contribute to strategic marketing initiatives. Collaborate with professionals in a dynamic remote work environment.",
        }
    },

    // Internships for Eleanor Nguyen (Google)
    {
        body: {
            title: "Data Scientist Intern",
            company: "Google",
            location: "Mountain View",
            pay: 35,
            category: ["Data Science", "Tech"],
            url: "www.google.com/datascientistintern",
            referralLimit: 6,
            mentorID: "2345678901",
            description: "Explore the field of Data Science at Google. Contribute to data-driven projects and gain insights into the world of machine learning and analytics.",
        }
    },
    {
        body: {
            title: "Product Management Intern",
            company: "Google",
            location: "San Francisco",
            pay: 28,
            category: ["Product Management", "Tech"],
            url: "www.google.com/productmanagementintern",
            referralLimit: 4,
            mentorID: "2345678901",
            description: "Become a part of Google's Product Management team. Assist in the development and management of products, and experience the fast-paced tech industry in San Francisco.",
        }
    },

    {
        body: {
            title: "Software Development Intern",
            company: "Microsoft",
            location: "Redmond",
            pay: 32,
            category: ["Software Development", "Tech"],
            url: "www.microsoft.com/softwaredevelopmentintern",
            referralLimit: 5,
            mentorID: "3456789012",
            description: "Embark on a software development journey with Microsoft in Redmond. Contribute to coding projects and collaborate with experienced software developers.",
        }
    },
    {
        body: {
            title: "Business Analyst Intern",
            company: "Microsoft",
            location: "Remote",
            pay: 26,
            category: ["Business Analyst", "Remote", "Communication"],
            url: "www.microsoft.com/businessanalystintern",
            referralLimit: 3,
            mentorID: "3456789012",
            description: "Join Microsoft's remote Business Analyst team. Analyze and improve business processes while working in a virtual environment.",
        }
    },

    // Internships for Sophie Johnson (Amazon)
    {
        body: {
            title: "E-commerce Intern",
            company: "Amazon",
            location: "Seattle",
            pay: 30,
            category: ["E-commerce", "Tech"],
            url: "www.amazon.com/ecommerceintern",
            referralLimit: 5,
            mentorID: "4567890123",
            description: "Immerse yourself in the world of e-commerce at Amazon. Work on exciting projects that contribute to the success of Amazon's online retail platform.",
        }
    },
    {
        body: {
            title: "Supply Chain Intern",
            company: "Amazon",
            location: "Remote",
            pay: 27,
            category: ["Supply Chain", "Remote"],
            url: "www.amazon.com/supplychainintern",
            referralLimit: 4,
            mentorID: "4567890123",
            description: "Explore the complexities of supply chain management with Amazon. Contribute to projects that optimize logistics and enhance the efficiency of Amazon's global operations.",
        }
    },

    // Internships for Harold Brown (Tesla)
    {
        body: {
            title: "Electrical Engineering Intern",
            company: "Tesla",
            location: "Palo Alto",
            pay: 35,
            category: ["Electrical Engineering", "Tech"],
            url: "www.tesla.com/electricalengineeringintern",
            referralLimit: 6,
            mentorID: "5678901234",
            description: "Gain hands-on experience in electrical engineering at Tesla. Work on innovative projects that contribute to the development of cutting-edge electric vehicles.",
        }
    },
    {
        body: {
            title: "Environmental Sustainability Intern",
            company: "Tesla",
            location: "Fremont",
            pay: 30,
            category: ["Environmental Sustainability", "Tech"],
            url: "www.tesla.com/sustainabilityintern",
            referralLimit: 5,
            mentorID: "5678901234",
            description: "Join Tesla's sustainability team as an intern. Contribute to projects focused on advancing environmental sustainability and promoting green initiatives.",
        }
    },

    // Internships for Isabella Taylor (Apple)
    {
        body: {
            title: "Aerospace Engineering Intern",
            company: "Apple",
            location: "Houston",
            pay: 35,
            category: ["Aerospace Engineering", "Tech"],
            url: "www.apple.com/aerospaceengineeringintern",
            referralLimit: 6,
            mentorID: "6789012345",
            description: "Explore the world of aerospace engineering with Apple. Contribute to projects that push the boundaries of technology in the field of aviation and space exploration.",
        }
    },
    {
        body: {
            title: "Virtual Reality Developer Intern",
            company: "Apple",
            location: "Remote",
            pay: 30,
            category: ["Virtual Reality", "Tech"],
            url: "www.apple.com/virtualrealityintern",
            referralLimit: 4,
            mentorID: "6789012345",
            description: "Join Apple's Virtual Reality team as an intern. Work on cutting-edge projects that define the future of immersive virtual experiences.",
        }
    },
    {
        body: {
            title: "Robotics Research Intern",
            company: "Apple",
            location: "San Jose",
            pay: 32,
            category: ["Robotics", "Tech"],
            url: "www.apple.com/roboticsresearchintern",
            referralLimit: 5,
            mentorID: "6789012345",
            description: "Immerse yourself in the field of robotics research at Apple. Contribute to projects that advance the capabilities of robotic systems.",
        }
    },

    // Internships for Victor Chen (Facebook)
    {
        body: {
            title: "Social Media Marketing Intern",
            company: "Facebook",
            location: "Menlo Park",
            pay: 28,
            category: ["Marketing", "Social Media"],
            url: "www.facebook.com/socialmediamarketingintern",
            referralLimit: 4,
            mentorID: "7890123456",
            description: "Become part of Facebook's Social Media Marketing team as an intern. Contribute to campaigns that shape the social media landscape.",
        }
    },
    {
        body: {
            title: "UX/UI Design Intern",
            company: "Facebook",
            location: "Remote",
            pay: 25,
            category: ["UX/UI Design", "Tech"],
            url: "www.facebook.com/uxuidesignintern",
            referralLimit: 3,
            mentorID: "7890123456",
            description: "Join Facebook's UX/UI Design team as an intern. Contribute to the design and user experience of Facebook's innovative products.",
        }
    },

    // Internships for Mia Gomez (Google)
    {
        body: {
            title: "Machine Learning Intern",
            company: "Google",
            location: "Mountain View",
            pay: 34,
            category: ["Machine Learning", "Tech"],
            url: "www.google.com/machinelearningintern",
            referralLimit: 6,
            mentorID: "8901234567",
            description: "Explore the field of Machine Learning at Google. Contribute to projects that leverage advanced algorithms and artificial intelligence.",
        }
    },
    {
        body: {
            title: "Green Energy Solutions Intern",
            company: "Google",
            location: "Sunnyvale",
            pay: 33,
            category: ["Green Energy", "Tech"],
            url: "www.google.com/greenenergyintern",
            referralLimit: 5,
            mentorID: "8901234567",
            description: "Join Google's Green Energy Solutions team as an intern. Contribute to projects that drive innovation in sustainable and eco-friendly technologies.",
        }
    },

    // Internships for William Johnson (Microsoft)
    {
        body: {
            title: "Software Architect Intern",
            company: "Microsoft",
            location: "Redmond",
            pay: 36,
            category: ["Software Architecture", "Tech"],
            url: "www.microsoft.com/softwarearchitectintern",
            referralLimit: 7,
            mentorID: "9012345678",
            description: "Embark on a journey into software architecture with Microsoft. Contribute to projects that define the structure and design of cutting-edge software solutions.",
        }
    },
    {
        body: {
            title: "Cybersecurity Analyst Intern",
            company: "Microsoft",
            location: "Remote",
            pay: 30,
            category: ["Cybersecurity", "Tech"],
            url: "www.microsoft.com/cybersecurityintern",
            referralLimit: 5,
            mentorID: "9012345678",
            description: "Join Microsoft's Cybersecurity team as an intern. Contribute to projects focused on enhancing the security and resilience of digital systems.",
        }
    },

    // Internships for Emma Ferguson (Google)
    {
        body: {
            title: "Augmented Reality Developer Intern",
            company: "Google",
            location: "San Francisco",
            pay: 32,
            category: ["Augmented Reality", "Tech"],
            url: "www.google.com/augmentedrealityintern",
            referralLimit: 6,
            mentorID: "0987654321",
            description: "Explore the intersection of technology and reality with Google's Augmented Reality team. Contribute to projects that push the boundaries of immersive experiences.",
        }
    },
    {
        body: {
            title: "Data Analyst Intern",
            company: "Google",
            location: "Mountain View",
            pay: 29,
            category: ["Data Analytics", "Tech"],
            url: "www.google.com/dataanalystintern",
            referralLimit: 4,
            mentorID: "0987654321",
            description: "Dive into the world of data analytics with Google. Contribute to projects that analyze and interpret data to drive informed decision-making.",
        }
    },
    {
        body: {
            title: "Marketing Analyst Intern",
            company: "Apple",
            location: "Cupertino",
            pay: 28,
            category: ["Marketing", "Analytics"],
            url: "www.apple.com/marketinganalystintern",
            referralLimit: 4,
            mentorID: "9876543219",
            description: "Join Apple's Marketing Analytics team as an intern. Contribute to projects that analyze marketing data and provide valuable insights to support strategic initiatives.",
        }
    },
    {
        body: {
            title: "Brand Management Intern",
            company: "Apple",
            location: "Remote",
            pay: 30,
            category: ["Brand Management", "Marketing"],
            url: "www.apple.com/brandmanagementintern",
            referralLimit: 5,
            mentorID: "9876543219",
            description: "Become part of Apple's Brand Management team as an intern. Contribute to projects that shape the brand identity and market positioning of Apple's products.",
        }
    },

    // Internships for Abigail Clark (Google)
    {
        body: {
            title: "Quantitative Analyst Intern",
            company: "Google",
            location: "Mountain View",
            pay: 32,
            category: ["Quantitative Analysis", "Tech"],
            url: "www.google.com/quantitativeanalystintern",
            referralLimit: 6,
            mentorID: "7654321098",
            description: "Dive into quantitative analysis with Google. Contribute to projects that involve statistical modeling and data-driven decision-making.",
        }
    },
    {
        body: {
            title: "Data Scientist Intern",
            company: "Google",
            location: "San Francisco",
            pay: 35,
            category: ["Data Science", "Tech"],
            url: "www.google.com/datascientistintern",
            referralLimit: 7,
            mentorID: "7654321098",
            description: "Explore the world of Data Science with Google. Contribute to projects that involve data exploration, analysis, and machine learning.",
        }
    },

    // Internships for Logan Taylor (Microsoft)
    {
        body: {
            title: "Software Development Intern",
            company: "Microsoft",
            location: "Redmond",
            pay: 34,
            category: ["Software Development", "Tech"],
            url: "www.microsoft.com/softwaredevelopmentintern",
            referralLimit: 6,
            mentorID: "6543210987",
            description: "Embark on a software development journey with Microsoft in Redmond. Contribute to coding projects and collaborate with experienced software developers.",
        }
    },
    {
        body: {
            title: "Cloud Computing Intern",
            company: "Microsoft",
            location: "Remote",
            pay: 31,
            category: ["Cloud Computing", "Tech"],
            url: "www.microsoft.com/cloudcomputingintern",
            referralLimit: 5,
            mentorID: "6543210987",
            description: "Explore the world of cloud computing with Microsoft. Contribute to projects that involve the design and implementation of scalable cloud solutions.",
        }
    },
    {
        body: {
            title: "Product Manager Intern",
            company: "Microsoft",
            location: "Seattle",
            pay: 36,
            category: ["Product Management", "Tech"],
            url: "www.microsoft.com/productmanagerintern",
            referralLimit: 7,
            mentorID: "6543210987",
            description: "Become part of Microsoft's Product Management team as an intern. Contribute to projects that involve product planning, development, and launch.",
        }
    },

    // Internships for James Evans (Amazon)
    {
        body: {
            title: "Content Creation Intern",
            company: "Amazon",
            location: "Seattle",
            pay: 29,
            category: ["Content Creation", "Media"],
            url: "www.amazon.com/contentcreationintern",
            referralLimit: 4,
            mentorID: "5432109876",
            description: "Immerse yourself in the world of content creation at Amazon. Contribute to projects that involve the development of engaging and creative multimedia content.",
        }
    },
    {
        body: {
            title: "Supply Chain Management Intern",
            company: "Amazon",
            location: "Remote",
            pay: 33,
            category: ["Supply Chain Management", "Business"],
            url: "www.amazon.com/supplychainmanagementintern",
            referralLimit: 6,
            mentorID: "5432109876",
            description: "Explore the complexities of supply chain management with Amazon. Contribute to projects that optimize logistics and enhance the efficiency of Amazon's global operations.",
        }
    },

    // Internships for Ava Baker (SpaceX)
    {
        body: {
            title: "Chemical Engineering Intern",
            company: "SpaceX",
            location: "Los Angeles",
            pay: 35,
            category: ["Chemical Engineering", "Engineering"],
            url: "www.spacex.com/chemicalengineeringintern",
            referralLimit: 6,
            mentorID: "4321098765",
            description: "Gain hands-on experience in chemical engineering at SpaceX. Contribute to projects that support the development and innovation of space exploration technologies.",
        }
    },
    {
        body: {
            title: "Innovation Research Intern",
            company: "SpaceX",
            location: "Remote",
            pay: 32,
            category: ["Innovation Research", "Research"],
            url: "www.spacex.com/innovationresearchintern",
            referralLimit: 5,
            mentorID: "4321098765",
            description: "Contribute to innovation research projects at SpaceX. Explore and analyze emerging technologies that drive advancements in space exploration.",
        }
    },

    // Internships for Harper Ferguson (Twitter)
    // Harper is not generating any internships

    // Internships for Ella Martinez (Apple)
    {
        body: {
            title: "Visual Culture Intern",
            company: "Apple",
            location: "Cupertino",
            pay: 30,
            category: ["Visual Culture", "Arts"],
            url: "www.apple.com/visualcultureintern",
            referralLimit: 3,
            mentorID: "0123456780",
            description: "Join Apple's Visual Culture team as an intern. Contribute to projects that explore the intersection of technology and artistic expression.",
        }
    },

    // Internships for Carter Williams (Google)
    {
        body: {
            title: "Mechanical Systems Integration Intern",
            company: "Google",
            location: "Mountain View",
            pay: 32,
            category: ["Mechanical Systems", "Tech"],
            url: "www.google.com/mechanicalsystemsintern",
            referralLimit: 4,
            mentorID: "1112223334",
            description: "Explore the integration of mechanical systems at Google. Contribute to projects that involve the design and optimization of complex mechanical components.",
        }
    },

    // Internships for Grace Collins (Microsoft)
    {
        body: {
            title: "Brain Research Intern",
            company: "Microsoft",
            location: "Redmond",
            pay: 35,
            category: ["Brain Research", "Science"],
            url: "www.microsoft.com/brainresearchintern",
            referralLimit: 5,
            mentorID: "2223334445",
            description: "Dive into the field of brain research with Microsoft. Contribute to projects that explore the complexities of the human brain and its functions.",
        }
    },
    {
        body: {
            title: "Neuroscience Analyst Intern",
            company: "Microsoft",
            location: "Remote",
            pay: 33,
            category: ["Neuroscience Analysis", "Science"],
            url: "www.microsoft.com/neuroscienceanalystintern",
            referralLimit: 4,
            mentorID: "2223334445",
            description: "Explore the intersection of neuroscience and technology with Microsoft. Contribute to projects that involve the analysis of neural data and brain-related research.",
        }
    },

    // Internships for Sebastian Lopez (Google)
    {
        body: {
            title: "Next-Gen Computing Systems Intern",
            company: "Google",
            location: "Mountain View",
            pay: 36,
            category: ["Computing Systems", "Tech"],
            url: "www.google.com/computingsystemsintern",
            referralLimit: 6,
            mentorID: "3334445556",
            description: "Explore the future of computing systems with Google. Contribute to projects that involve the development of next-generation technologies and systems.",
        }
    },
    {
        body: {
            title: "Artificial Intelligence Research Intern",
            company: "Google",
            location: "Sunnyvale",
            pay: 34,
            category: ["Artificial Intelligence", "Tech"],
            url: "www.google.com/airesearchintern",
            referralLimit: 5,
            mentorID: "3334445556",
            description: "Join Google's Artificial Intelligence research team as an intern. Contribute to projects that push the boundaries of AI and machine learning.",
        }
    },

    // Internships for Skylar Adams (Amazon)
    {
        body: {
            title: "Digital Marketing Intern",
            company: "Amazon",
            location: "Seattle",
            pay: 28,
            category: ["Digital Marketing", "Marketing"],
            url: "www.amazon.com/digitalmarketingintern",
            referralLimit: 4,
            mentorID: "4445556667",
            description: "Immerse yourself in the world of digital marketing at Amazon. Contribute to projects that involve online advertising, social media, and e-commerce strategies.",
        }
    },
    {
        body: {
            title: "Business Intelligence Analyst Intern",
            company: "Amazon",
            location: "Remote",
            pay: 30,
            category: ["Business Intelligence", "Tech"],
            url: "www.amazon.com/bianalystintern",
            referralLimit: 5,
            mentorID: "4445556667",
            description: "Join Amazon's Business Intelligence team as an intern. Contribute to projects that involve analyzing business data to provide valuable insights for decision-making.",
        }
    },

    // Internships for Zara Turner (SpaceX)
    {
        body: {
            title: "Rocket Propulsion Intern",
            company: "SpaceX",
            location: "Hawthorne",
            pay: 35,
            category: ["Rocket Propulsion", "Engineering"],
            url: "www.spacex.com/rocketpropulsionintern",
            referralLimit: 6,
            mentorID: "5556667778",
            description: "Gain hands-on experience in rocket propulsion at SpaceX. Contribute to projects that support the development and testing of rocket engines for space exploration.",
        }
    },
    {
        body: {
            title: "Spacecraft Design Intern",
            company: "SpaceX",
            location: "Los Angeles",
            pay: 32,
            category: ["Spacecraft Design", "Engineering"],
            url: "www.spacex.com/spacecraftdesignintern",
            referralLimit: 5,
            mentorID: "5556667778",
            description: "Explore spacecraft design with SpaceX. Contribute to projects that involve the conceptualization and development of innovative space vehicles.",
        }
    }
];

//console.log(internships);


module.exports = {
    internships
};
