// Static content: Myth Busters, Roles, Compliance Mapper Lite

export const mythBusters = [
  {
    "id": "myth_001",
    "title": "Myth: A password vault IS a PAM program",
    "debunk": "A password vault secures and stores credentials — that is one piece of a much larger puzzle. A full PAM program also enforces who can access what, when, and from where; monitors what they do during that session; applies least-privilege controls; and rotates credentials automatically. Vaulting without these controls leaves your most critical assets exposed even when the passwords are locked away."
  },
  {
    "id": "myth_002",
    "title": "Myth: We'll just give admins strong passwords",
    "debunk": "A strong password is a single barrier — and barriers get broken. Privileged credentials are among the most targeted assets in any environment: they get phished, reused, leaked, and shared. Industry best practice requires layering multi-factor authentication on top of strong credentials, storing them in a managed vault with automated rotation, and monitoring how and when they are used. Password strength alone is not a security posture."
  },
  {
    "id": "myth_003",
    "title": "Myth: If we implement MFA, we're secure",
    "debunk": "MFA verifies who is at the door — it says nothing about what they do once inside. An attacker who compromises a multi-factor-authenticated account still has full run of everything that account can reach. MFA must be paired with least-privilege access controls, session monitoring, and anomaly detection to meaningfully limit the damage from a compromised identity."
  },
  {
    "id": "myth_004",
    "title": "Myth: We don't have insider threats",
    "debunk": "Every organization has insider threats — not because all insiders are malicious, but because the category is broader than most realize. Employees, contractors, third-party vendors, and compromised accounts all constitute insider risk. Insiders are harder to detect than external attackers because they carry legitimate credentials and their behavior blends into normal operations. Monitoring privileged activity continuously is the only reliable way to catch abuse before it becomes a breach."
  },
  {
    "id": "myth_005",
    "title": "Myth: Shared admin accounts are OK if we document who uses them",
    "debunk": "Documentation of who used a shared account is not the same as accountability. Shared credentials obscure individual actions in system logs, making forensic attribution impossible when something goes wrong. Compliance frameworks and incident response both depend on knowing exactly who did what and when. Individual accounts with unique credentials are the only way to preserve that audit trail."
  },
  {
    "id": "myth_006",
    "title": "Myth: Our perimeter is so strong, we don't need to worry about lateral movement",
    "debunk": "No perimeter holds indefinitely — the question is what attackers can do once they are inside. Lateral movement almost always depends on escalating privileges or stealing credentials from one system to reach the next. The countermeasure is not a stronger perimeter but tighter controls inside it: network segmentation, least-privilege access so compromised accounts have limited reach, and continuous monitoring to detect unusual movement before it reaches critical systems."
  },
  {
    "id": "myth_007",
    "title": "Myth: Compliance means we're secure",
    "debunk": "Compliance frameworks define the minimum controls required to satisfy auditors — they are not designed to stop a determined attacker. Organizations can satisfy every regulatory requirement and still have unmanaged accounts, unmonitored sessions, and over-privileged identities that attackers will find and exploit. Compliance is the baseline. Actual security requires continuously discovering, monitoring, and enforcing controls on privileged access beyond what any checklist requires."
  },
  {
    "id": "myth_008",
    "title": "Myth: We'll handle PAM once we scale",
    "debunk": "Privileged accounts, service accounts, and credentials multiply faster than most organizations track. Waiting until you are larger does not make PAM easier — it means more accounts to discover, more exceptions to resolve, and more existing access to review and remediate. The complexity of a PAM program scales directly with the size of the environment it has to cover. Starting early, even with a phased approach, is dramatically less costly than retrofitting controls onto a mature infrastructure."
  },
  {
    "id": "myth_009",
    "title": "Myth: Our admins would never do anything malicious",
    "debunk": "The risk from privileged accounts is not only about intent — it is also about scope. An admin who has more access than their role requires becomes a high-impact risk whether they act maliciously, make an honest mistake, or have their account compromised by an attacker. Least-privilege access limits the blast radius of any of these scenarios. Monitoring ensures that unusual behavior — regardless of its cause — is detected and responded to quickly."
  },
  {
    "id": "myth_010",
    "title": "Myth: We can handle breach response internally",
    "debunk": "Effective breach response depends on having the forensic data to understand what happened — which accounts were compromised, and how far the attacker moved. Without privileged session logs and audit trails, that reconstruction is guesswork. Beyond the technical dimension, meaningful incident response also involves legal counsel, communications decisions, and potentially regulatory notification. Having a documented plan, and the privileged access audit data to support it, before an incident occurs is what determines whether the response is controlled or chaotic."
  },
  {
    "id": "myth_011",
    "title": "Myth: Service accounts don't need management",
    "debunk": "Service accounts frequently carry elevated privileges and run continuously in the background — yet they are rarely subject to the same password rotation, MFA requirements, or monitoring applied to human accounts. Research shows dormant, over-privileged service accounts exist in the majority of enterprise environments. When attackers compromise a service account, they gain persistent, hard-to-detect access that can be used to move laterally across the entire environment. Every service account is an attack surface that needs to be discovered, inventoried, and actively managed."
  },
  {
    "id": "myth_012",
    "title": "Myth: We only need to protect the crown jewels",
    "debunk": "Attackers rarely reach high-value targets directly. They exploit a weak endpoint, a forgotten account, or an over-privileged service account to gain an initial foothold — then use that position to escalate privileges and move toward more sensitive systems. The path to the crown jewels runs through everything else first. Protecting only your most critical assets while leaving the rest uncontrolled gives attackers the stepping stones they need to reach them."
  }
];

export const rolePages = [
  {
    "id": "role_admin",
    "title": "IT Admin",
    "icon": "⚙️",
    "whatItMeans": "PAM is about giving you the minimum access you need for your job—and no more. It means your actions are logged and audited. It means you have tools to do your job securely.",
    "topConcerns": [
      "How do I get access quickly without it taking forever?",
      "Will my actions be monitored constantly?",
      "Am I a security suspect just because I'm an admin?"
    ],
    "questionsToAsk": [
      "Can I use just-in-time access instead of standing privilege?",
      "What data access do I actually need for my daily work?",
      "Is there a secure way to request temporary elevated access?",
      "How will I know if my credentials are compromised?"
    ],
    "termsToKnow": [
      "just_in_time_access",
      "privileged_session",
      "least_privilege",
      "credential_compromise",
      "session_recording"
    ],
    "relevantScenarios": [
      "scenario_001",
      "scenario_005",
      "scenario_018"
    ]
  },
  {
    "id": "role_ciso",
    "title": "Security Leader / CISO",
    "icon": "🛡️",
    "whatItMeans": "PAM is your primary control against privilege abuse, both intentional and accidental. It's how you enforce zero trust at the identity level.",
    "topConcerns": [
      "What's the ROI of PAM? How much risk does it reduce?",
      "How do I implement PAM across hybrid and multi-cloud?",
      "What's the priority—monitoring or access control?",
      "How do I prove PAM compliance to auditors?"
    ],
    "questionsToAsk": [
      "What percentage of our infrastructure is covered by PAM today?",
      "Do we have visibility into all privileged access attempts?",
      "Are we detecting lateral movement?",
      "What's our incident response time for compromised privileged accounts?"
    ],
    "termsToKnow": [
      "zero_trust",
      "continuous_monitoring",
      "privilege_escalation",
      "insider_threat",
      "incident_response"
    ],
    "relevantScenarios": [
      "scenario_003",
      "scenario_006",
      "scenario_024"
    ]
  },
  {
    "id": "role_auditor",
    "title": "Auditor / Compliance",
    "icon": "📋",
    "whatItMeans": "PAM creates the audit trail that proves compliance. Every action, every access, every denial—it's all logged. This is how you answer 'who accessed what and when?'",
    "topConcerns": [
      "Are logs stored securely and retained long enough?",
      "Can we prove that access decisions were made properly?",
      "How do we verify that segregation of duties is enforced?",
      "Is there evidence of monitoring and response?"
    ],
    "questionsToAsk": [
      "Can you produce an audit trail for any privileged action?",
      "Are access recertifications happening and documented?",
      "How do you verify that deprovisioning actually happened?",
      "What's your retention period for access logs?"
    ],
    "termsToKnow": [
      "security_audit_trail",
      "compliance",
      "segregation_of_duties",
      "access_recertification",
      "accountability"
    ],
    "relevantScenarios": [
      "scenario_009",
      "scenario_013",
      "scenario_017"
    ]
  },
  {
    "id": "role_helpdesk",
    "title": "Helpdesk / Support",
    "icon": "🎧",
    "whatItMeans": "PAM means you're the first line of support for admin access requests. You'll help people request access quickly, and you'll help them understand why some requests are denied.",
    "topConcerns": [
      "How do I help admins request access without slowing them down?",
      "What do I do if an access request is suspicious?",
      "Am I responsible for revoking access when people leave?",
      "How do I help people who lost or forgot their credentials?"
    ],
    "questionsToAsk": [
      "What's the process for emergency access requests?",
      "How quickly will access typically be provisioned?",
      "What's the offboarding checklist to ensure all access is removed?",
      "Where do I report suspected privilege misuse?"
    ],
    "termsToKnow": [
      "user_provisioning",
      "user_deprovisioning",
      "approval_workflow",
      "credential_rotation",
      "just_in_time_access"
    ],
    "relevantScenarios": [
      "scenario_002",
      "scenario_013",
      "scenario_020"
    ]
  },
  {
    "id": "role_business",
    "title": "Business Leader",
    "icon": "💼",
    "whatItMeans": "PAM means your sensitive data is protected by controlling who can access it and monitoring that access. It means you can trust your systems. It means breaches cost less.",
    "topConcerns": [
      "Will PAM slow down business operations?",
      "How much does PAM cost? What's the ROI?",
      "Are we meeting compliance requirements?",
      "How prepared are we for a breach?"
    ],
    "questionsToAsk": [
      "What's our current risk from uncontrolled privileged access?",
      "How long would it take to detect a compromise?",
      "Do we have incident response insurance?",
      "What's the cost of a breach vs. the cost of PAM?"
    ],
    "termsToKnow": [
      "risk_assessment",
      "insider_threat",
      "incident_response",
      "business_continuity",
      "data_protection"
    ],
    "relevantScenarios": [
      "scenario_010",
      "scenario_014",
      "scenario_030"
    ]
  }
];

export const complianceLiteThemes = [
  {
    "id": "compliance_sox",
    "theme": "SOX (Sarbanes-Oxley)",
    "description": "Financial reporting controls and audit trails",
    "pamCapability": "PAM provides audit trails of who accessed financial systems and when. Session recording and approval workflows document segregation of duties.",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_hipaa",
    "theme": "HIPAA",
    "description": "Healthcare data protection and access controls",
    "pamCapability": "PAM controls who can access patient data and monitors that access. Encryption and session recording help meet HIPAA's audit and accountability requirements.",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_gdpr",
    "theme": "GDPR",
    "description": "Personal data protection and privacy rights",
    "pamCapability": "PAM restricts data access to those who need it and records who accessed what. This supports data minimization, access control, and audit requirements.",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_pci_dss",
    "theme": "PCI DSS",
    "description": "Payment card data security and access control",
    "pamCapability": "PAM controls access to cardholder data, enforces authentication, and maintains audit logs. Session recording and approval workflows meet PCI requirement 7.",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_iso27001",
    "theme": "ISO 27001",
    "description": "Information security management systems",
    "pamCapability": "PAM is a control that supports ISO 27001 across access control, cryptography, monitoring, and incident management.",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_nist",
    "theme": "NIST Cybersecurity Framework",
    "description": "Five functions: Identify, Protect, Detect, Respond, Recover",
    "pamCapability": "PAM supports all five functions: inventory (Identify), access control (Protect), monitoring (Detect), incident response (Respond), and recovery planning (Recover).",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_cis",
    "theme": "CIS Critical Security Controls",
    "description": "Foundational security practices and controls",
    "pamCapability": "PAM directly addresses CIS controls 5 (Access Control), 6 (Identity Management), 8 (Audit Logs), and 16 (Account Monitoring).",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  },
  {
    "id": "compliance_zero_trust",
    "theme": "Zero Trust Architecture",
    "description": "Never trust, always verify—every access, everywhere",
    "pamCapability": "PAM enforces zero trust principles at the identity and privilege level through continuous authentication, monitoring, and micro-access decisions.",
    "disclaimer": "PAM capabilities may help support this requirement. This is not legal or compliance advice."
  }
];
