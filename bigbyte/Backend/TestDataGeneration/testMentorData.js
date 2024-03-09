const mentors = [
    {
        body: {
            "id": "1234567890",
            "firstName": "Alfredo",
            "lastName": "Kapoor",
            "company": "Apple",
            "bio": "Some creative bio",
            "linkedIn": "www.linkedin.com/alfredokapoor"
        }
    },
    {
        body: {
            "id": "2345678901",
            "firstName": "Eleanor",
            "lastName": "Nguyen",
            "company": "Google",
            "bio": "Passionate about technology and innovation",
            "linkedIn": "www.linkedin.com/eleanornguyen"
        }
    },
    {
        body: {
            "id": "3456789012",
            "firstName": "Carlos",
            "lastName": "Martinez",
            "company": "Microsoft",
            "bio": "Building the future with software",
            "linkedIn": "www.linkedin.com/carlosmartinez"
        }
    },
    {
        body: {
            "id": "4567890123",
            "firstName": "Sophie",
            "lastName": "Johnson",
            "company": "Amazon",
            "bio": "Innovating in the e-commerce space",
            "linkedIn": "www.linkedin.com/sophiejohnson"
        }
    },
    {
        body: {
            "id": "5678901234",
            "firstName": "Harold",
            "lastName": "Brown",
            "company": "Tesla",
            "bio": "Engineering the future of electric vehicles",
            "linkedIn": "www.linkedin.com/haroldbrown"
        }
    },
    {
        body: {
            "id": "6789012345",
            "firstName": "Isabella",
            "lastName": "Taylor",
            "company": "Apple",
            "bio": "Exploring space exploration and technology",
            "linkedIn": "www.linkedin.com/isabellataylor"
        }
    },
    {
        body: {
            "id": "7890123456",
            "firstName": "Victor",
            "lastName": "Chen",
            "company": "Facebook",
            "bio": "Connecting people through social technology",
            "linkedIn": "www.linkedin.com/victorchen"
        }
    },
    {
        body: {
            "id": "8901234567",
            "firstName": "Mia",
            "lastName": "Gomez",
            "company": "Google",
            "bio": "Creating innovative solutions for a better future",
            "linkedIn": "www.linkedin.com/miagomez"
        }
    },
    {
        body: {
            "id": "9012345678",
            "firstName": "William",
            "lastName": "Johnson",
            "company": "Microsoft",
            "bio": "Passionate about software development",
            "linkedIn": "www.linkedin.com/williamjohnson"
        }
    },
    {
        body: {
            "id": "0987654321",
            "firstName": "Emma",
            "lastName": "Ferguson",
            "company": "Google",
            "bio": "Contributing to the future of technology",
            "linkedIn": "www.linkedin.com/emmaferguson"
        }
    },
    {
        body: {
            "id": "9876543219",
            "firstName": "Liam",
            "lastName": "Carter",
            "company": "Apple",
            "bio": "Innovating in the world of marketing",
            "linkedIn": "www.linkedin.com/liamcarter"
        }
    },
    {
        body: {
            "id": "7654321098",
            "firstName": "Abigail",
            "lastName": "Clark",
            "company": "Google",
            "bio": "Exploring the beauty of numbers",
            "linkedIn": "www.linkedin.com/abigailclark"
        }
    },
    {
        body: {
            "id": "6543210987",
            "firstName": "Logan",
            "lastName": "Taylor",
            "company": "Microsoft",
            "bio": "Building the future through engineering",
            "linkedIn": "www.linkedin.com/logantaylor"
        }
    },
    {
        body: {
            "id": "5432109876",
            "firstName": "James",
            "lastName": "Evans",
            "company": "Amazon",
            "bio": "Immersed in the world of literature",
            "linkedIn": "www.linkedin.com/jamesevans"
        }
    },
    {
        body: {
            "id": "4321098765",
            "firstName": "Ava",
            "lastName": "Baker",
            "company": "SpaceX",
            "bio": "Exploring chemical processes and innovation",
            "linkedIn": "www.linkedin.com/avabaker"
        }
    },
    {
        body: {
            "id": "3210987654",
            "firstName": "Harper",
            "lastName": "Ferguson",
            "company": "Twitter",
            "bio": "Understanding societal structures and dynamics",
            "linkedIn": "www.linkedin.com/harperferguson"
        }
    },
    {
        body: {
            "id": "0123456780",
            "firstName": "Ella",
            "lastName": "Martinez",
            "company": "Apple",
            "bio": "Passionate about interpreting visual culture",
            "linkedIn": "www.linkedin.com/ellamartinez"
        }
    },
    {
        body: {
            "id": "1112223334",
            "firstName": "Carter",
            "lastName": "Williams",
            "company": "Google",
            "bio": "Integrating mechanical and electrical systems",
            "linkedIn": "www.linkedin.com/carterwilliams"
        }
    },
    {
        body: {
            "id": "2223334445",
            "firstName": "Grace",
            "lastName": "Collins",
            "company": "Microsoft",
            "bio": "Studying the complexities of the brain",
            "linkedIn": "www.linkedin.com/gracecollins"
        }
    },
    {
        body: {
            "id": "3334445556",
            "firstName": "Sebastian",
            "lastName": "Lopez",
            "company": "Google",
            "bio": "Building the next generation of computing systems",
            "linkedIn": "www.linkedin.com/sebastianlopez"
        }
    },
    {
        body: {
            "id": "4445556667",
            "firstName": "Scarlett",
            "lastName": "Young",
            "company": "Amazon",
            "bio": "Advocating for sustainable policies",
            "linkedIn": "www.linkedin.com/scarlettyoung"
        }
    },
    {
        body: {
            "id": "5556667778",
            "firstName": "Leo",
            "lastName": "Gomez",
            "company": "Tesla",
            "bio": "Navigating global diplomacy",
            "linkedIn": "www.linkedin.com/leogomez"
        }
    },
    {
        body: {
            "id": "6667778889",
            "firstName": "Stella",
            "lastName": "Ward",
            "company": "Google",
            "bio": "Expressing creativity through visual communication",
            "linkedIn": "www.linkedin.com/stellaward"
        }
    },
    {
        body: {
            "id": "7778889990",
            "firstName": "Nathan",
            "lastName": "Harrison",
            "company": "Microsoft",
            "bio": "Promoting community well-being",
            "linkedIn": "www.linkedin.com/nathanharrison"
        }
    },
    {
        body: {
            "id": "8889990001",
            "firstName": "Sophia",
            "lastName": "Turner",
            "company": "Netflix",
            "bio": "Transforming the entertainment industry",
            "linkedIn": "www.linkedin.com/sophiaturner"
        }
    }
];


module.exports = {
    mentors
};