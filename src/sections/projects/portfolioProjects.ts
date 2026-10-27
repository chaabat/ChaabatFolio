import { type PortfolioProject } from './portfolioConstellation';
import { preloadImage } from '../../utils/assetLoaders';
import { portfolioSkills } from './portfolioSkills';
import {
    PROJECT_DETAILS_IMAGE_SIZES,
    PROJECT_PREVIEW_IMAGE_SIZES,
    projectImagesById,
} from './projectImageAssets';

const withProjectScreenshots = (projects: PortfolioProject[]): PortfolioProject[] =>
    projects.map((project) => ({
        ...project,
        screenshot: projectImagesById[project.id]?.preview,
        detailsScreenshot: projectImagesById[project.id]?.details,
        skills: project.skills.map(
            (skill) =>
                portfolioSkills[portfolioSkills.findIndex((s) => s.id === skill)]?.label ?? skill,
        ),
    }));

const getAdjacentProjects = (
    project: PortfolioProject,
    projects: PortfolioProject[],
): PortfolioProject[] => {
    const index = projects.findIndex((candidate) => candidate.id === project.id);
    if (index < 0 || projects.length < 2) {
        return [];
    }

    return [
        projects[(index - 1 + projects.length) % projects.length],
        projects[(index + 1) % projects.length],
    ];
};

export const preloadAdjacentProjectScreenshots = (project: PortfolioProject): void => {
    const constellationProjects = portfolioProjects.filter(
        (candidate) => candidate.constellation.id === project.constellation.id,
    );
    const adjacentProjects = new Set([
        ...getAdjacentProjects(project, portfolioProjects),
        ...getAdjacentProjects(project, constellationProjects),
    ]);

    adjacentProjects.forEach((candidate) => {
        if (candidate.screenshot) {
            preloadImage(candidate.screenshot, PROJECT_PREVIEW_IMAGE_SIZES);
        }
    });
};

export const preloadAdjacentProjectDetails = async (project: PortfolioProject): Promise<void> => {
    const adjacentScreenshots = getAdjacentProjects(project, portfolioProjects).flatMap(
        (candidate) => (candidate.detailsScreenshot ? [candidate.detailsScreenshot] : []),
    );

    await Promise.allSettled(
        adjacentScreenshots.map((source) => preloadImage(source, PROJECT_DETAILS_IMAGE_SIZES)),
    );
};

const fullStackProjects: PortfolioProject[] = [
    {
        id: 'assurance-company',
        title: 'AssuranceCompany — Insurance Management Platform',
        label: 'AssuranceCompany',

        description:
            'Distributed microservices architecture for end-to-end insurance management. Decoupled back-end services with a dynamic React interface for efficient policy subscriptions and claims processing.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'microservices',
            'react',
            'typescript',
            'spring-boot',
            'rest-api',
            'docker',
            'system-design',
        ],

        domain: 'Fintech / Insurance',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [0.0, 0.0, 0.15],
            links: ['justcash', 'nostalgia', 'parents-pearl'],
        },
    },
    {
        id: 'nostalgia',
        title: 'Nostalgia — Music Streaming Platform',
        label: 'Nostalgia',

        description:
            'Music streaming platform combining a secured Spring Boot back-end for catalog management with a reactive Angular front-end for smooth playback and playlist organization.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'angular',
            'typescript',
            'java',
            'spring-boot',
            'rest-api',
            'audio-streaming',
            'ui-ux',
        ],

        domain: 'Media / Entertainment',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [0.0, 1.05, -0.1],
            links: ['justcash', 'parents-pearl'],
        },
    },
    {
        id: 'justcash',
        title: 'JustCash — Banking Microservices Back-End',
        label: 'JustCash',

        description:
            'Banking back-end built on a microservices architecture. Secured REST APIs for account management, real-time transaction processing and inter-service communication.',

        period: '2024 – 2025',
        role: 'Back-End Developer',

        skills: [
            'full-stack',
            'java',
            'spring-boot',
            'microservices',
            'rest-api',
            'database-management',
            'api-security',
        ],

        domain: 'Banking / Fintech',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [0.92, 0.55, 0.05],
            links: ['citronix'],
        },
    },
    {
        id: 'citronix',
        title: 'Citronix — Farm Management System',
        label: 'Citronix',

        description:
            'Application for the integrated management of citrus farms and orchards: crop life-cycle tracking, harvest optimization, sales management and stock control.',

        period: '2024 – 2025',
        role: 'Back-End Developer',

        skills: [
            'full-stack',
            'java',
            'spring-boot',
            'postgresql',
            'rest-api',
            'domain-driven-design',
        ],

        domain: 'Agritech / Enterprise Software',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [0.9, -0.5, -0.1],
            links: ['school-management'],
        },
    },
    {
        id: 'school-management',
        title: 'School Management — School Administration System',
        label: 'School Management',

        description:
            'Web platform for school administration: student enrollment, timetables, grades, absences and communication between teachers, students and administration.',

        period: '2024',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'laravel',
            'php',
            'mysql',
            'blade',
            'bootstrap',
            'MVC-architecture',
        ],

        domain: 'EdTech / Enterprise',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [0.05, -1.0, 0.1],
            links: ['greentogether'],
        },
    },
    {
        id: 'greentogether',
        title: 'GreenTogether — Recycling Management Platform',
        label: 'GreenTogether',

        description:
            'Collaborative platform connecting households with approved collectors. Automated collection tracking and digitized the waste-management workflow.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'typescript',
            'react',
            'node-js',
            'geolocation',
            'workflow-automation',
        ],

        domain: 'Cleantech / Ecology',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [-0.9, -0.55, 0.05],
            links: ['parents-pearl'],
        },
    },
    {
        id: 'parents-pearl',
        title: 'Parents Pearl — Parenting & Education Platform',
        label: 'Parents Pearl',

        description:
            'Tracking and communication platform for parental and educational support, with a modern interface for managing information, activities and daily interactions.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'typescript',
            'angular',
            'spring boot',
            'node-js',
            'rest-api',
            'ui-ux',
        ],

        domain: 'EdTech / Social',
        owner: 'Personal project',

        constellation: {
            id: 'full-stack',
            position: [-0.88, 0.5, -0.08],
            links: [],
        },
    },
];

const devOpsCloudProjects: PortfolioProject[] = [
    {
        id: 'siae',
        title: 'SIAE — Copyright Management Platform',
        label: 'SIAE',

        description:
            'Supervised SQL batch processing and automated Linux system tasks on a copyright-management platform. Analyzed production incidents, optimized application performance and worked with the infrastructure teams to improve service reliability and continuity.',

        period: '2025',
        role: 'DevOps Engineer',

        skills: [
            'devops-cloud',
            'linux',
            'sql',
            'python',
            'docker',
            'ci-cd',
            'monitoring',
            'automation',
            'incident-management',
        ],

        domain: 'Intellectual Property / Rights Management',
        owner: 'NTT DATA · Tétouan, Morocco',

        constellation: {
            id: 'devops-cloud',
            position: [-1.0, -0.15, -0.1],
            links: ['flyer'],
        },
    },
    {
        id: 'flyer',
        title: 'Flyer.be — Print-on-Demand E-Commerce Platform',
        label: 'Flyer.be',

        description:
            'Migrated the web application to a new framework and handled corrective and evolutive maintenance. Containerized services with Docker, automated builds and deployments with CI/CD pipelines, and delivered web features within a Scrum team.',

        period: '2025',
        role: 'Full-Stack Developer',

        skills: [
            'devops-cloud',
            'docker',
            'ci-cd',
            'containerization',
            'laravel',
            'next-js',
            'mongodb',
            'git',
            'scrum',
        ],

        domain: 'E-Commerce / Print on Demand',
        owner: 'ELAVI · Casablanca, Morocco',

        constellation: {
            id: 'devops-cloud',
            position: [0.0, 0.95, 0.05],
            links: ['siae', 'livriliya'],
        },
    },
    {
        id: 'livriliya',
        title: 'Livriliya — Real-Time Delivery Platform',
        label: 'Livriliya',

        description:
            'Designed and integrated a real-time notification system for couriers. Managed data flows and event triggers for every new order and improved responsiveness to reduce order handling time.',

        period: '2023 - 2024',
        role: 'Web Developer',

        skills: [
            'devops-cloud',
            'rest-api',
            'sql',
            'php',
            'laravel',
            'react',
            'javascript',
            'real-time-events',
        ],

        domain: 'Logistics / Delivery',
        owner: 'EAGER GROUPS · Azrou, Morocco',

        constellation: {
            id: 'devops-cloud',
            position: [0.95, 0.0, -0.1],
            links: ['flyer'],
        },
    },
];

const infraSecurityProjects: PortfolioProject[] = [
    {
        id: 'assurcorp',
        title: 'AssurCorp — Secure Enterprise Network',
        label: 'AssurCorp',

        description:
            'Design and hardening of an insurance-sector infrastructure: centralized access with Active Directory and LAPS, high-availability routing with MikroTik and VRRP, DFS-R file replication, pfSense/OPNsense firewalls with IPsec VPN, and real-time Grafana monitoring over SNMP.',

        period: '2025 – 2026',
        role: 'Infrastructure & Cybersecurity Engineer',

        skills: [
            'infra-security',
            'windows-server',
            'active-directory',
            'pfsense',
            'opnsense',
            'mikrotik',
            'vrrp',
            'ipsec-vpn',
            'snmp',
            'grafana',
            'network-security',
        ],

        domain: 'Infrastructure & Cybersecurity',
        owner: 'Academic project · fictional company',

        constellation: {
            id: 'infra-security',
            position: [0.7, 1.1, -0.25],
            links: ['naturacorp', 'sentinel-x'],
        },
    },
    {
        id: 'naturacorp',
        title: 'NaturaCorp — Virtualized Infrastructure & Collaboration Services',
        label: 'NaturaCorp',

        description:
            'Full deployment of a virtualized enterprise infrastructure on VMware: network segmentation with a pfSense DMZ, Odoo ERP integration, Nextcloud secure storage, proactive Zabbix monitoring and centralized UrBackup backup and restore.',

        period: '2025 – 2026',
        role: 'Infrastructure & Virtualization Architect',

        skills: [
            'infra-security',
            'vmware',
            'pfsense',
            'dmz-segmentation',
            'odoo',
            'nextcloud',
            'zabbix',
            'urbackup',
            'virtualization',
        ],

        domain: 'Enterprise Infrastructure / Virtualization',
        owner: 'Academic project · fictional company',

        constellation: {
            id: 'infra-security',
            position: [-0.1, -0.85, 0.0],
            links: ['sentinel-x'],
        },
    },
    {
        id: 'sentinel-x',
        title: 'Sentinel-X — IoT Observability & AI Security Detection',
        label: 'Sentinel-X',

        description:
            'IoT and AI security monitoring platform: YOLO object detection, event transport over MQTT, SIEM/XDR monitoring with Wazuh, and metrics centralized in Grafana dashboards.',

        period: '2026',
        role: 'DevOps & Cybersecurity Engineer',

        skills: [
            'infra-security',
            'python',
            'iot',
            'mqtt',
            'wazuh',
            'grafana',
            'yolo',
            'raspberry-pi',
            'siem-xdr',
        ],

        domain: 'Cybersecurity / IoT & AI Observability',
        owner: 'Personal project',

        constellation: {
            id: 'infra-security',
            position: [-0.95, 0.7, 0.1],
            links: [],
        },
    },
];

const constellationScrollOrder = {
    'full-stack': 0,
    'devops-cloud': 1,
    'infra-security': 2,
} satisfies Record<PortfolioProject['constellation']['id'], number>;

const compareProjectScrollOrder = (a: PortfolioProject, b: PortfolioProject): number =>
    constellationScrollOrder[a.constellation.id] - constellationScrollOrder[b.constellation.id] ||
    a.constellation.position[0] - b.constellation.position[0] ||
    b.constellation.position[1] - a.constellation.position[1];

const portfolioProjectsWithoutScreenshots: PortfolioProject[] = [
    ...fullStackProjects,
    ...devOpsCloudProjects,
    ...infraSecurityProjects,
].sort(compareProjectScrollOrder);

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots(
    portfolioProjectsWithoutScreenshots,
);
