const users = [
    {
        body: {
            "id": "0123456789",
            "firstName": "Shivum",
            "lastName": "Kapoor",
            "major": "Computer Science",
            "gradYear": "2026",
            "bio": "I am very cool",
            "organizations": ["Club 1", "Club 2"],
            "linkedIn": "www.linkedin.com"
        }
    },
    {
        body: {
            "id": "9876543210",
            "firstName": "Amanda",
            "lastName": "Johnson",
            "major": "Biology",
            "gradYear": "2025",
            "bio": "Exploring the wonders of biology",
            "organizations": ["Science Society", "Environmental Club"],
            "linkedIn": "www.linkedin.com/amanda"
        }
    },
    {
        body: {
            "id": "2345678901",
            "firstName": "Michael",
            "lastName": "Smith",
            "major": "Chemistry",
            "gradYear": "2024",
            "bio": "Passionate about molecular structures",
            "organizations": ["Chemistry Club", "Research Society"],
            "linkedIn": "www.linkedin.com/michaelsmith"
        }
    },
    {
        body: {
            "id": "3456789012",
            "firstName": "Emily",
            "lastName": "Davis",
            "major": "Psychology",
            "gradYear": "2023",
            "bio": "Studying the human mind",
            "organizations": ["Psychology Association", "Mindfulness Club"],
            "linkedIn": "www.linkedin.com/emilydavis"
        }
    },
    {
        body: {
            "id": "4567890123",
            "firstName": "Daniel",
            "lastName": "Garcia",
            "major": "Finance",
            "gradYear": "2026",
            "bio": "Passionate about investments and finance",
            "organizations": ["Finance Club", "Investment Society"],
            "linkedIn": "www.linkedin.com/danielgarcia"
        }
    },
    {
        body: {
            "id": "5678901234",
            "firstName": "Sophia",
            "lastName": "Miller",
            "major": "History",
            "gradYear": "2024",
            "bio": "Exploring the tales of the past",
            "organizations": ["History Club", "Archaeology Society"],
            "linkedIn": "www.linkedin.com/sophiamiller"
        }
    },
    {
        body: {
            "id": "6789012345",
            "firstName": "Isaac",
            "lastName": "Rodriguez",
            "major": "Mechanical Engineering",
            "gradYear": "2025",
            "bio": "Designing the future with machines",
            "organizations": ["Engineering Society", "Robotics Club"],
            "linkedIn": "www.linkedin.com/isaacrodriguez"
        }
    },
    {
        body: {
            "id": "7890123456",
            "firstName": "Olivia",
            "lastName": "Turner",
            "major": "Political Science",
            "gradYear": "2023",
            "bio": "Passionate about global affairs",
            "organizations": ["Political Science Club", "Model United Nations"],
            "linkedIn": "www.linkedin.com/oliviaturner"
        }
    },
    {
        body: {
            "id": "8901234567",
            "firstName": "Ethan",
            "lastName": "Wang",
            "major": "Electrical Engineering",
            "gradYear": "2026",
            "bio": "Innovating with circuits and technology",
            "organizations": ["Electrical Engineering Society", "Innovation Club"],
            "linkedIn": "www.linkedin.com/ethanwang"
        }
    },
    {
        body: {
            "id": "9012345678",
            "firstName": "Emma",
            "lastName": "Fisher",
            "major": "Environmental Science",
            "gradYear": "2025",
            "bio": "Advocating for a sustainable future",
            "organizations": ["Environmental Science Club", "Green Initiative"],
            "linkedIn": "www.linkedin.com/emmafisher"
        }
    },
    {
        body: {
            "id": "0987654321",
            "firstName": "Liam",
            "lastName": "Carter",
            "major": "Marketing",
            "gradYear": "2024",
            "bio": "Creativity meets strategy in marketing",
            "organizations": ["Marketing Club", "Advertising Society"],
            "linkedIn": "www.linkedin.com/liamcarter"
        }
    },
    {
        body: {
            "id": "9876543219",
            "firstName": "Abigail",
            "lastName": "Clark",
            "major": "Mathematics",
            "gradYear": "2023",
            "bio": "Exploring the beauty of numbers",
            "organizations": ["Mathematics Society", "Data Analytics Club"],
            "linkedIn": "www.linkedin.com/abigailclark"
        }
    },
    {
        body: {
            "id": "7654321098",
            "firstName": "Mia",
            "lastName": "Hernandez",
            "major": "Civil Engineering",
            "gradYear": "2026",
            "bio": "Building a better world through engineering",
            "organizations": ["Civil Engineering Society", "Structural Design Club"],
            "linkedIn": "www.linkedin.com/miahernandez"
        }
    },
    {
        body: {
            "id": "6543210987",
            "firstName": "James",
            "lastName": "Evans",
            "major": "English Literature",
            "gradYear": "2025",
            "bio": "Immersed in the world of literature",
            "organizations": ["Literature Club", "Creative Writing Society"],
            "linkedIn": "www.linkedin.com/jamesevans"
        }
    },
    {
        body: {
            "id": "5432109876",
            "firstName": "Ava",
            "lastName": "Baker",
            "major": "Chemical Engineering",
            "gradYear": "2024",
            "bio": "Exploring chemical processes and innovation",
            "organizations": ["Chemical Engineering Society", "Innovation in Chemistry Club"],
            "linkedIn": "www.linkedin.com/avabaker"
        }
    },
    {
        body: {
            "id": "4321098765",
            "firstName": "Logan",
            "lastName": "Taylor",
            "major": "Physics",
            "gradYear": "2023",
            "bio": "Curiosity about the fundamental laws of nature",
            "organizations": ["Physics Club", "Astronomy Society"],
            "linkedIn": "www.linkedin.com/logantaylor"
        }
    },
    {
        body: {
            "id": "3210987654",
            "firstName": "Harper",
            "lastName": "Ferguson",
            "major": "Sociology",
            "gradYear": "2026",
            "bio": "Understanding societal structures and dynamics",
            "organizations": ["Sociology Club", "Social Justice Society"],
            "linkedIn": "www.linkedin.com/harperferguson"
        }
    },
    {
        body: {
            "id": "0123456780",
            "firstName": "Ella",
            "lastName": "Martinez",
            "major": "Art History",
            "gradYear": "2025",
            "bio": "Passionate about interpreting visual culture",
            "organizations": ["Art History Society", "Fine Arts Club"],
            "linkedIn": "www.linkedin.com/ellamartinez"
        }
    },
    {
        body: {
            "id": "1112223334",
            "firstName": "Carter",
            "lastName": "Williams",
            "major": "Mechatronics Engineering",
            "gradYear": "2026",
            "bio": "Integrating mechanical and electrical systems",
            "organizations": ["Mechatronics Club", "Automation Society"],
            "linkedIn": "www.linkedin.com/carterwilliams"
        }
    },
    {
        body: {
            "id": "2223334445",
            "firstName": "Grace",
            "lastName": "Collins",
            "major": "Neuroscience",
            "gradYear": "2024",
            "bio": "Studying the complexities of the brain",
            "organizations": ["Neuroscience Club", "Brain Research Society"],
            "linkedIn": "www.linkedin.com/gracecollins"
        }
    },
    {
        body: {
            "id": "3334445556",
            "firstName": "Sebastian",
            "lastName": "Lopez",
            "major": "Computer Engineering",
            "gradYear": "2023",
            "bio": "Building the next generation of computing systems",
            "organizations": ["Computer Engineering Society", "Embedded Systems Club"],
            "linkedIn": "www.linkedin.com/sebastianlopez"
        }
    },
    {
        body: {
            "id": "4445556667",
            "firstName": "Scarlett",
            "lastName": "Young",
            "major": "Environmental Policy",
            "gradYear": "2026",
            "bio": "Advocating for sustainable policies",
            "organizations": ["Environmental Policy Club", "Green Advocacy"],
            "linkedIn": "www.linkedin.com/scarlettyoung"
        }
    },
    {
        body: {
            "id": "5556667778",
            "firstName": "Leo",
            "lastName": "Gomez",
            "major": "International Relations",
            "gradYear": "2025",
            "bio": "Navigating global diplomacy",
            "organizations": ["International Relations Society", "Diplomatic Club"],
            "linkedIn": "www.linkedin.com/leogomez"
        }
    },
    {
        body: {
            "id": "6667778889",
            "firstName": "Stella",
            "lastName": "Ward",
            "major": "Graphic Design",
            "gradYear": "2023",
            "bio": "Expressing creativity through visual communication",
            "organizations": ["Graphic Design Club", "Digital Arts Society"],
            "linkedIn": "www.linkedin.com/stellaward"
        }
    },
    {
        body: {
            "id": "7778889990",
            "firstName": "Nathan",
            "lastName": "Harrison",
            "major": "Public Health",
            "gradYear": "2024",
            "bio": "Promoting community well-being",
            "organizations": ["Public Health Association", "Community Outreach Club"],
            "linkedIn": "www.linkedin.com/nathanharrison"
        }
    }
];

module.exports = {
    users
};