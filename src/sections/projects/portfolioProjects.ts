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

const frontEndProjects: PortfolioProject[] = [
    {
        id: 'Siae',
        title: 'SIAE — Gestion des Droits d\'Auteur',
        label: 'SIAE ',

        description:
            'Supervision des traitements batch SQL, automatisation des tâches système sous Linux et analyse des incidents de production. Contribution active à l\'optimisation des performances applicatives, à la conteneurisation et à la fiabilisation de la continuité de service.',

        period: '6 mois',
        role: 'Ingénieur DevOps / Support N3',

        skills: [
            'front-end',
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
        owner: 'NTT DATA (Tétouan, Maroc)',

        constellation: {
            id: 'front-end',
            position: [-1.02, 0.82, -0.18],
            links: ['nttdata-flyer'],
        },
    },
    {
        id: 'flyer',
        title: 'Flyer.be — Plateforme E-Commerce Print on Demand',
        label: 'Flyer.be',

        description:
            'Migration applicative vers un framework moderne et maintenance évolutive. Mise en place de la conteneurisation Docker, intégration dans les pipelines CI/CD et développement de fonctionnalités web / UI au sein d\'une équipe Scrum.',

        period: '2024',
        role: 'DevOps / Full-Stack Engineer',

        skills: [
            'front-end',
            'docker',
            'ci-cd',
            'laravel',
            'next-js',
            'mongodb',
            'git',
            'scrum',
            'containerization',
        ],

        domain: 'E-Commerce / Print on Demand',
        owner: 'Elavi',

        constellation: {
            id: 'front-end',
            position: [-0.08, 1.5, -0.28],
            links: ['sentinel-x', 'nttdata-livriliya'],
        },
    },
    {
        id: 'livriliya',
        title: 'Livriliya — Plateforme SaaS de Livraison en Temps Réel',
        label: 'Livriliya',

        description:
            'Conception et intégration d\'un système de notifications temps réel pour les livreurs. Optimisation des flux de données, déclencheurs d\'événements à chaque commande et amélioration de l\'expérience utilisateur.',

        period: '2024',
        role: 'Software & Cloud Engineer',

        skills: [
            'front-end',
            'rest-api',
            'sql',
            'php',
            'laravel',
            'react',
            'javascript',
            'real-time-events',
        ],

        domain: 'Logistics / Delivery SaaS',
        owner: 'NTT DATA (Tétouan, Maroc)',

        constellation: {
            id: 'front-end',
            position: [-0.42, -0.16, 0.02],
            links: ['nttdata-flyer'],
        },
    },
    
    
];

const fullStackProjects: PortfolioProject[] = [
    {
        id: 'assurance-company',
        title: 'AssuranceCompany: Plateforme Microservices de Gestion d\'Assurance',
        label: 'AssuranceCompany',

        description:
            'Architecture distribuée basée sur des microservices pour la gestion complète d\'une compagnie d\'assurance. Découplage des services back-end et interface utilisateur dynamique en ReactJS pour le traitement efficace des souscriptions et sinistres.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer / Architecte Microservices',

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

        domain: 'Fintech / Assurance',
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [0.95, 1.4, -0.06],
            links: ['justcash', 'nostalgia'],
        },
    },
    {
        id: 'justcash',
        title: 'JustCash: Application Bancaire Back-End Microservices',
        label: 'JustCash',

        description:
            'Plateforme bancaire back-end construite autour d\'une architecture microservices. Implémentation d\'APIs REST sécurisées pour la gestion des comptes, le traitement des transactions financières en temps réel et la communication inter-services.',

        period: '2024 – 2025',
        role: 'Back-End Developer',

        skills: [
            'back-end',
            'java',
            'spring-boot',
            'microservices',
            'rest-api',
            'database-management',
            'banking-security',
        ],

        domain: 'Banking / Fintech',
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [0.485, 0.95, 0.14],
            links: ['assurance-company'],
        },
    },
    {
        id: 'citronix',
        title: 'Citronix: Système de Gestion d\'Exploitation Agricole',
        label: 'Citronix',

        description:
            'Application dédiée à la gestion intégrée de fermes et vergers d\'agrumes. Suivi du cycle de vie des cultures, optimisation de la récolte, gestion des ventes et contrôle des stocks pour maximiser la productivité agricole.',

        period: '2024 – 2025',
        role: 'Back-End Developer',

        skills: [
            'back-end',
            'java',
            'spring-boot',
            'postgresql',
            'rest-api',
            'domain-driven-design',
            'farm-management',
        ],

        domain: 'Agritech / Enterprise Software',
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [0.15, 0.6, -0.1],
            links: ['justcash', 'school-management'],
        },
    },
    {
        id: 'nostalgia',
        title: 'Nostalgia: Application Full-Stack de Streaming Musical',
        label: 'Nostalgia',

        description:
            'Plateforme de streaming musical associant un back-end Spring Boot sécurisé pour la gestion dynamique du catalogue à un front-end Angular réactif assurant la lecture fluide et l\'organisation des playlists.',

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
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [-0.773, -0.9, 0],
            links: ['greentogether', 'parents-pearl'],
            labelOffset: [0, 0.12],
        },
    },
    {
        id: 'parents-pearl',
        title: 'Parents_Pearl: Application Web & Mobile Pédagogique',
        label: 'Parents Pearl',

        description:
            'Plateforme de suivi et de communication dédiée à l\'accompagnement parental et éducatif. Offre une interface fluide et moderne pour la gestion des informations, activités et interactions quotidiennes des parents.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'typescript',
            'react',
            'node-js',
            'rest-api',
            'ui-ux',
            'educational-tech',
        ],

        domain: 'EdTech / Social',
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [-0.45, -0.5, 0.2],
            links: ['nostalgia'],
        },
    },
    {
        id: 'greentogether',
        title: 'GreenTogether: Plateforme de Gestion de Recyclage',
        label: 'GreenTogether',

        description:
            'Application collaborative facilitant le recyclage en connectant les particuliers avec des collecteurs agréés. Automatisation du suivi des collectes et optimisation de la gestion des déchets à travers un workflow digitalisé.',

        period: '2024 – 2025',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'typescript',
            'react',
            'node-js',
            'geolocated-services',
            'sustainability-tech',
            'workflow-automation',
        ],

        domain: 'Cleantech / Ecology',
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [-1.009, 0.088, 0.1],
            links: ['assurance-company'],
        },
    },
    {
        id: 'school-management',
        title: 'School Management: Système de Gestion Établissement Scolaire',
        label: 'School Mgmt',

        description:
            'Plateforme web complète pour l\'administration d\'établissements scolaires. Inscription des étudiants, suivi des emplois du temps, gestion des notes, absences et communication entre enseignants, élèves et administration.',

        period: '2024',
        role: 'Full-Stack Developer',

        skills: [
            'full-stack',
            'laravel',
            'blade',
            'php',
            'mysql',
            'bootstrap',
            'web-architecture',
        ],

        domain: 'EdTech / Enterprise',
        owner: 'Projet Personnel',

        constellation: {
            id: 'full-stack',
            position: [0.65, -0.3, -0.15],
            links: ['citronix'],
            labelOffset: [0, -0.12],
        },
    },
];

const backEndProjects: PortfolioProject[] = [
    {
        id: 'assurcorp',
        title: 'AssurCorp — Infrastructure & Sécurisation Réseau',
        label: 'AssurCorp',

        description:
            'Conception et sécurisation d\'une infrastructure d\'entreprise du secteur de l\'assurance. Centralisation des accès via Active Directory et LAPS, haute disponibilité du routage avec MikroTik/VRRP, réplication de fichiers DFS-R, pare-feu pfSense/OPNsense (VPN IPsec) et supervision temps réel Grafana via SNMP.',

        period: '2025 – 2026',
        role: 'Ingénieur Infrastructure & Cybersécurité',

        skills: [
            'back-end',
            'windows-server',
            'active-directory',
            'laps',
            'pfsense',
            'opnsense',
            'mikrotik',
            'vrrp',
            'ipsec-vpn',
            'dfs-r',
            'snmp',
            'grafana',
            'network-security',
        ],

        domain: 'Infrastructure & Cybersecurity / Systems Administration',
        owner: 'Projet Académique / Entreprise Fictive',

        constellation: {
            id: 'back-end',
            position: [0.64, 1.14, -0.3],
            links: ['naturacorp', 'sentinel-x'],
        },
    },
    {
        id: 'naturacorp',
        title: 'NaturaCorp — Infrastructure Virtualisée & Services Collaboratifs',
        label: 'NaturaCorp',

        description:
            'Déploiement complet d\'une infrastructure d\'entreprise virtualisée sous VMware. Segmentation réseau via pfSense (DMZ), intégration de l\'ERP Odoo, solution de stockage sécurisé Nextcloud, supervision proactive avec Zabbix et politique de sauvegarde/restauration centralisée avec UrBackup.',

        period: '2025 – 2026',
        role: 'Architecte Infrastructure & Virtualisation',

        skills: [
            'back-end',
            'vmware',
            'pfsense',
            'dmz-segmentation',
            'odoo-erp',
            'nextcloud',
            'zabbix',
            'urbackup',
            'sysadmin',
            'virtualization',
        ],

        domain: 'Enterprise Infrastructure / Cloud & Virtualization',
        owner: 'Projet Académique / Entreprise Fictive',

        constellation: {
            id: 'back-end',
            position: [-0.48, -0.92, -0.02],
            labelOffset: [0.28, 0],
            links: ['sentinel-x'],
        },
    },
    {
        id: 'sentinel-x',
        title: 'Sentinel-X — Système d\'Observabilité IoT & Détection Sécurité IA',
        label: 'Sentinel-X',

        description:
            'Plateforme de surveillance et d\'analyse de sécurité IoT/IA. Intégration de détection d\'objets YOLO, transmission d\'événements via MQTT, surveillance SIEM/XDR avec Wazuh, et centralisation des métriques de métrologie sur tableaux de bord Grafana.',

        period: '2026',
        role: 'DevOps & Cybersecurity Specialist',

        skills: [
            'back-end',
            'python',
            'iot',
            'mqtt',
            'wazuh',
            'grafana',
            'yolo',
            'raspberry-pi',
            'cybersecurity',
            'siem-monitoring',
        ],

        domain: 'Cybersecurity / IoT & AI Observability',
        owner: 'Projet Personnel',

        constellation: {
            id: 'back-end',
            position: [-1, 0.66, 0.1],
            labelOffset: [-0.05, 0.05],
            links: ['assurcorp'],
        },
    },
];

const constellationScrollOrder = {
    'front-end': 0,
    'full-stack': 1,
    'back-end': 2,
} satisfies Record<PortfolioProject['constellation']['id'], number>;

const compareProjectScrollOrder = (a: PortfolioProject, b: PortfolioProject): number =>
    constellationScrollOrder[a.constellation.id] - constellationScrollOrder[b.constellation.id] ||
    a.constellation.position[0] - b.constellation.position[0] ||
    b.constellation.position[1] - a.constellation.position[1];

const portfolioProjectsWithoutScreenshots: PortfolioProject[] = [
    ...frontEndProjects,
    ...fullStackProjects,
    ...backEndProjects,
].sort(compareProjectScrollOrder);

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots(
    portfolioProjectsWithoutScreenshots,
);
