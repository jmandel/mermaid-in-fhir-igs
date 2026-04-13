# FHIR IG Mermaid Diagram Catalog

> Auto-generated 2026-04-13 from [build.fhir.org](https://build.fhir.org/ig/qas.json) CI builds
> Lookback: 90 days — **213 diagrams** from **38 repo/branch builds**

### Diagram types

| Type | Count |
|------|------:|
| graph | 89 |
| sequenceDiagram | 68 |
| flowchart | 29 |
| stateDiagram-v2 | 15 |
| classDiagram | 8 |
| pie | 2 |
| gantt | 1 |
| erDiagram | 1 |
| **Total** | **213** |

---

## ehealthsuisse/ch-epr-fhir @ master

**Package:** `ch.fhir.ig.ch-epr-fhir#5.0.0`

**CH EPR FHIR (R4)**

[Build](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master) · [GitHub](https://github.com/ehealthsuisse/ch-epr-fhir/tree/master) · [Canonical](http://fhir.ch/ig/ch-epr-fhir/ImplementationGuide/ch.fhir.ig.ch-epr-fhir)

FHIR 4.0.1 · 2026-01-30

### iti-mhd.html (#1) — [view page](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master/iti-mhd.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
           'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Query| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C(Document Responder own community)
    B --> D(Document Responders federated communities)
```

### iti-mhd.html (#2) — [view page](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master/iti-mhd.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Retrieve| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C{own community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

### iti-mhd.html (#3) — [view page](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master/iti-mhd.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Source] -->|Update Doc Metadata| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Source)
    B --> C{own Community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

### iti-67.html (#4) — [view page](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master/iti-67.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
           'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Query| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C(Document Responder own community)
    B --> D(Document Responders federated communities)
```

### iti-68.html (#5) — [view page](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master/iti-68.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Retrieve| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C{own community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

### ch-mhd-1.html (#6) — [view page](https://build.fhir.org/ig/ehealthsuisse/ch-epr-fhir/branches/master/ch-mhd-1.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Source] -->|Update Doc Metadata| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Source)
    B --> C{own Community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

## FHIR/ig-guidance @ master

**Package:** `hl7.fhir.uv.howto#0.1.0`

**Guidance for FHIR IG Creation**

[Build](https://build.fhir.org/ig/FHIR/ig-guidance/branches/master) · [GitHub](https://github.com/FHIR/ig-guidance/tree/master) · [Canonical](http://hl7.org/fhir/uv/howto/ImplementationGuide/hl7.fhir.uv.howto)

FHIR 5.0.0 · 2026-02-01

### diagrams-mermaid.html — [view page](https://build.fhir.org/ig/FHIR/ig-guidance/branches/master/diagrams-mermaid.html)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## freshehr/interopen-uk-fhir-ps @ master

**Package:** `hl7.fhir.au.ps#0.6.0-cibuild`

**AU Patient Summary Implementation Guide**

[Build](https://build.fhir.org/ig/freshehr/interopen-uk-fhir-ps/branches/master) · [GitHub](https://github.com/freshehr/interopen-uk-fhir-ps/tree/master) · [Canonical](http://hl7.org.au/fhir/ps/ImplementationGuide/hl7.fhir.au.ps)

FHIR 4.0.1 · 2026-02-15

### uc-interstate.html (#1) — [view page](https://build.fhir.org/ig/freshehr/interopen-uk-fhir-ps/branches/master/uc-interstate.html)

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  actor Attending GP as Attending GP
  participant Clinic CIS as Clinic CIS
  participant Patient Summary Host as Patient Summary Host
  Attending GP ->> Clinic CIS: Scan QR for Patient Summary access
  Clinic CIS ->> Patient Summary Host: Retrieve Patient Summary
  Attending GP ->> Clinic CIS: View Patient Summary
```

### uc-referral.html (#2) — [view page](https://build.fhir.org/ig/freshehr/interopen-uk-fhir-ps/branches/master/uc-referral.html)

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  participant GP CIS as GP CIS
  actor Endocrinologist as Endocrinologist
  participant Endocrinologist CIS as Endocrinologist CIS
  Endocrinologist ->> Endocrinologist CIS: Access Referral and embedded Patient Summary
  Endocrinologist CIS ->> GP CIS: Check for updates and retrieve current Patient Summary
  Endocrinologist ->> Endocrinologist CIS: View current Patient Summary
```

## HL7-cz/hdr @ main

**Package:** `hl7.fhir.cz.hdr#0.1.0`

**HL7 Czech Hospital Discharge Report Implementation Guide**

[Build](https://build.fhir.org/ig/HL7-cz/hdr/branches/main) · [GitHub](https://github.com/HL7-cz/hdr/tree/main) · [Canonical](https://hl7.cz/fhir/hdr/ImplementationGuide/hl7.fhir.cz.hdr)

FHIR 4.0.1 · 2026-03-20

### implementation-notes.html (#1) — [view page](https://build.fhir.org/ig/HL7-cz/hdr/branches/main/implementation-notes.html)

```mermaid
classDiagram
  direction LR
  class CZ_BundleHDR{
    <<Bundle>>
  }
  CZ_BundleHDR *-- "1" CZ_CompositionHdr
  CZ_BundleHDR *-- "1" CZ_PatientCore
  CZ_BundleHDR *-- "0..*" CZ_PractionerCore
  CZ_BundleHDR *-- "0..*" CZ_OrganizationCore
  CZ_BundleHDR *-- "0..*" CZ_EncounterHdr
  CZ_BundleHDR *-- "0..*" CZ_PractitionerRole
  CZ_BundleHDR *-- "1" CZ_ProvenanceCore
  CZ_PractitionerRole *-- "0..*" CZ_OrganizationCore
  CZ_PractitionerRole *-- "0..*" CZ_PractionerCore
  CZ_EncounterHdr *-- "1" CZ_PatientCore
  CZ_EncounterHdr *-- "1" CZ_OrganizationCore
  

  CZ_CompositionHdr --> CZ_PractitionerRole: attester[legalAuthenticator]
  CZ_CompositionHdr --> CZ_PractitionerRole: attester[resultValidator]
  CZ_CompositionHdr --> CZ_PractitionerRole: author
  CZ_CompositionHdr --> CZ_PatientCore: subject
  CZ_CompositionHdr --> CZ_EncounterHdr: period [start]
  CZ_CompositionHdr --> CZ_EncounterHdr: period [end]
  CZ_EncounterHdr --> CZ_OrganizationCore: serviceProvider
  CZ_CompositionHdr --> CZ_OrganizationCore: castodian
```

### implementation-notes-cs.html (#2) — [view page](https://build.fhir.org/ig/HL7-cz/hdr/branches/main/implementation-notes-cs.html)

```mermaid
classDiagram
  direction LR
  class CZ_BundleHDR{
    <<Bundle>>
  }
  CZ_BundleHDR *-- "1" CZ_CompositionHdr
  CZ_BundleHDR *-- "1" CZ_PatientCore
  CZ_BundleHDR *-- "0..*" CZ_PractionerCore
  CZ_BundleHDR *-- "0..*" CZ_OrganizationCore
  CZ_BundleHDR *-- "0..*" CZ_EncounterHdr
  CZ_BundleHDR *-- "0..*" CZ_PractitionerRole
  CZ_BundleHDR *-- "1" CZ_ProvenanceCore
  CZ_PractitionerRole *-- "0..*" CZ_OrganizationCore
  CZ_PractitionerRole *-- "0..*" CZ_PractionerCore
  CZ_EncounterHdr *-- "1" CZ_PatientCore
  CZ_EncounterHdr *-- "1" CZ_OrganizationCore
  

  CZ_CompositionHdr --> CZ_PractitionerRole: attester[legalAuthenticator]
  CZ_CompositionHdr --> CZ_PractitionerRole: attester[resultValidator]
  CZ_CompositionHdr --> CZ_PractitionerRole: author
  CZ_CompositionHdr --> CZ_PatientCore: subject
  CZ_CompositionHdr --> CZ_EncounterHdr: period [start]
  CZ_CompositionHdr --> CZ_EncounterHdr: period [end]
  CZ_EncounterHdr --> CZ_OrganizationCore: serviceProvider
  CZ_CompositionHdr --> CZ_OrganizationCore: castodian
```

## HL7-cz/img @ master

**Package:** `hl7.fhir.cz.img#0.1.0-ballot`

**HL7 Czech Imaging Report IG**

[Build](https://build.fhir.org/ig/HL7-cz/img/branches/master) · [GitHub](https://github.com/HL7-cz/img/tree/master) · [Canonical](https://hl7.cz/fhir/img/ImplementationGuide/hl7.fhir.cz.img)

FHIR 4.0.1 · 2026-01-28

### implementation-notes.html (#1) — [view page](https://build.fhir.org/ig/HL7-cz/img/branches/master/implementation-notes.html)

```mermaid
classDiagram
  direction LR
  class CZ_BundleImagingReport{
    <<Bundle>>
  }
  CZ_BundleImagingReport *-- "1" CZ_CompositionImagingReport
  CZ_BundleImagingReport *-- "1" CZ_DiagnosticReport
  CZ_BundleImagingReport *-- "1" CZ_PatientCore
  CZ_BundleImagingReport *-- "0..*" CZ_ImagingOrderInformation
  CZ_BundleImagingReport *-- "0..*" CZ_Practioner
  CZ_BundleImagingReport *-- "0..*" CZ_DeviceObserver
  CZ_BundleImagingReport *-- "0..*" CZ_OrganizationCore
  CZ_BundleImagingReport *-- "0..*" CZ_StudyImaging
  CZ_BundleImagingReport *-- "0..*" CZ_ProcedureImaging
  CZ_BundleImagingReport *-- "0..*" CZ_ObservationResultImaging
  CZ_BundleImagingReport *-- "0..*" CZ_KeyImageDocumentReference
  CZ_BundleImagingReport *-- "0..*" CZ_ConditionImage
  CZ_BundleImagingReport *-- "0..*" CZ_CarePlanImage

  CZ_DiagnosticReport --> CZ_CompositionImagingReport: composition
  

  CZ_CompositionImagingReport --> CZ_ImagingOrderInformation: extension[basedOn]  
  CZ_CompositionImagingReport --> CZ_DiagnosticReport: extension[diagnosticreport-reference]
  CZ_CompositionImagingReport --> CZ_Practioner: author[author]
  CZ_CompositionImagingReport --> CZ_DeviceObserver: author[authoring-device]
  CZ_CompositionImagingReport --> CZ_Practioner: attester[legalAuthenticator]
  CZ_CompositionImagingReport --> CZ_Practioner: attester[resultValidator]
  CZ_CompositionImagingReport --> CZ_OrganizationCore: custodian
  CZ_CompositionImagingReport --> CZ_PatientCore: subject
  CZ_CompositionImagingReport --> CZ_StudyImaging: section[imagingstudy]
  CZ_CompositionImagingReport --> CZ_ImagingOrderInformation: section[order]
  CZ_CompositionImagingReport --> CZ_ConditionImage: section[clinicalQuestion]
  CZ_CompositionImagingReport --> CZ_ProcedureImaging: section[procedure]
  CZ_CompositionImagingReport --> CZ_StudyImaging: section[comparison]
  CZ_CompositionImagingReport --> CZ_ObservationResultImaging: section[findings]
  CZ_CompositionImagingReport --> CZ_KeyImageDocumentReference: section[findings]
  CZ_CompositionImagingReport --> CZ_KeyImageDocumentReference: section[impression]
  CZ_CompositionImagingReport --> CZ_ObservationResultImaging: section[impression]
  CZ_CompositionImagingReport --> CZ_ConditionImage: section[impression]
  CZ_CompositionImagingReport --> CZ_CarePlanImage: section[recommendation]
```

### implementation-notes-cs.html (#2) — [view page](https://build.fhir.org/ig/HL7-cz/img/branches/master/implementation-notes-cs.html)

```mermaid
classDiagram
  direction LR
  class CZ_BundleImagingReport{
    <<Bundle>>
  }
  CZ_BundleImagingReport *-- "1" CZ_CompositionImagingReport
  CZ_BundleImagingReport *-- "1" CZ_DiagnosticReport
  CZ_BundleImagingReport *-- "1" CZ_PatientCore
  CZ_BundleImagingReport *-- "0..*" CZ_ImagingOrderInformation
  CZ_BundleImagingReport *-- "0..*" CZ_Practioner
  CZ_BundleImagingReport *-- "0..*" CZ_DeviceObserver
  CZ_BundleImagingReport *-- "0..*" CZ_OrganizationCore
  CZ_BundleImagingReport *-- "0..*" CZ_StudyImaging
  CZ_BundleImagingReport *-- "0..*" CZ_ProcedureImaging
  CZ_BundleImagingReport *-- "0..*" CZ_ObservationResultImaging
  CZ_BundleImagingReport *-- "0..*" CZ_KeyImageDocumentReference
  CZ_BundleImagingReport *-- "0..*" CZ_ConditionImage
  CZ_BundleImagingReport *-- "0..*" CZ_CarePlanImage

  CZ_DiagnosticReport --> CZ_CompositionImagingReport: composition
  

  CZ_CompositionImagingReport --> CZ_ImagingOrderInformation: extension[basedOn]  
  CZ_CompositionImagingReport --> CZ_DiagnosticReport: extension[diagnosticreport-reference]
  CZ_CompositionImagingReport --> CZ_Practioner: author[author]
  CZ_CompositionImagingReport --> CZ_DeviceObserver: author[authoring-device]
  CZ_CompositionImagingReport --> CZ_Practioner: attester[legalAuthenticator]
  CZ_CompositionImagingReport --> CZ_Practioner: attester[resultValidator]
  CZ_CompositionImagingReport --> CZ_OrganizationCore: custodian
  CZ_CompositionImagingReport --> CZ_PatientCore: subject
  CZ_CompositionImagingReport --> CZ_StudyImaging: section[imagingstudy]
  CZ_CompositionImagingReport --> CZ_ImagingOrderInformation: section[order]
  CZ_CompositionImagingReport --> CZ_ConditionImage: section[clinicalQuestion]
  CZ_CompositionImagingReport --> CZ_ProcedureImaging: section[procedure]
  CZ_CompositionImagingReport --> CZ_StudyImaging: section[comparison]
  CZ_CompositionImagingReport --> CZ_ObservationResultImaging: section[findings]
  CZ_CompositionImagingReport --> CZ_KeyImageDocumentReference: section[findings]
  CZ_CompositionImagingReport --> CZ_KeyImageDocumentReference: section[impression]
  CZ_CompositionImagingReport --> CZ_ObservationResultImaging: section[impression]
  CZ_CompositionImagingReport --> CZ_ConditionImage: section[impression]
  CZ_CompositionImagingReport --> CZ_CarePlanImage: section[recommendation]
```

## HL7/aitransparency-ig @ main

**Package:** `hl7.fhir.uv.aitransparency#1.0.0-ballot`

**AI Transparency on FHIR**

[Build](https://build.fhir.org/ig/HL7/aitransparency-ig/branches/main) · [GitHub](https://github.com/HL7/aitransparency-ig/tree/main) · [Canonical](http://hl7.org/fhir/uv/aitransparency/ImplementationGuide/hl7.fhir.uv.aitransparency)

FHIR 4.0.1 · 2026-03-30

### general_guidance.html (#1) — [view page](https://build.fhir.org/ig/HL7/aitransparency-ig/branches/main/general_guidance.html)

```mermaid
classDiagram
    class Resource {
        <<FHIR Resource>>
        id
        meta.security = AIAIST
        ...
    }
```

### general_guidance.html (#2) — [view page](https://build.fhir.org/ig/HL7/aitransparency-ig/branches/main/general_guidance.html)

```mermaid
classDiagram
    direction LR
    class Resource {
        <<FHIR Resource>>
        id
        meta.security = AIAIST
        ...
    }

    class Provenance {
        <<FHIR Resource>>
        target : Reference resource created/updated
        occurred : When
        reason : `AIAST`
        agent : Reference to AI Device
        agent : References to other agents involved
        entity : References to Model-Card DocumentReference
        entity : References to other data used
    }

    class Device {
        <<FHIR Resource>>
        id
        identifier
        type = "AI"
        extension : Specific kind of AI
        modelNumber
        manufacturer
        manufactureDate
        deviceName
        version
        owner
        contact
        url
        note
        safety
        extension : model-card
    }

    class DocumentReference {
        <<FHIR Resource>>
        id
        type = AImodelCard
        category = AImodelCardMarkdownFormat | AImodelCardCHAIformat
        description
        version
        data / url = codeable model-card details
        data / url = pdf rendering
    }

    Resource "1..*" <-- Provenance : "Provenance.target"
    Provenance --> Device : "Provenance.agent.who"
    Provenance --> DocumentReference : "Provenance.entity.what"
```

## HL7/APIX---API-Exchange-for-Medicinal-Products @ draft-of-Developer-notes

**Package:** `hl7.fhir.uv.apix#0.1.0`

**API for the Exchange of Medicinal Product Information (APIX)**

[Build](https://build.fhir.org/ig/HL7/APIX---API-Exchange-for-Medicinal-Products/branches/draft-of-Developer-notes) · [GitHub](https://github.com/HL7/APIX---API-Exchange-for-Medicinal-Products/tree/draft-of-Developer-notes) · [Canonical](http://hl7.org/fhir/uv/apix/ImplementationGuide/hl7.fhir.uv.apix)

FHIR 5.0.0 · 2026-02-04

### workflow.html (#1) — [view page](https://build.fhir.org/ig/HL7/APIX---API-Exchange-for-Medicinal-Products/branches/draft-of-Developer-notes/workflow.html)

```mermaid
sequenceDiagram
    participant C as Company
    participant R as Regulator
    
    %% Phase 0: Registration
    Note over C,R: Phase 0: Registration & Connection
    C->>R: 0.1 Register with Regulator Portal
    R-->>C: Client Credentials & Org ID
    C->>R: 0.2 OAuth2 Authentication
    
    %% Phase 1: Submission
    Note over C,R: Phase 1: Submission & Validation
    par Upload Binaries/Bundles
        C->>R: 1.1 POST PDFs (Binary)
        C->>R: 1.1 POST Labels (Document Bundles)
        C->>R: 1.1 POST CMC (Transaction Bundles)
    end
    C->>R: 1.2 POST DocumentReferences (IDs/Links)
    C->>R: 1.3 POST Task (Orchestrator Index)
    
    activate R
    R->>R: 2.0 Validate Application
    
    alt Validation Passes
        R-->>C: 3.1 Ack Receipt & Validation Results
    else Validation Fails
        R->>C: 4.1 Request Missing Documents
        C->>R: 4.2.1 Submit Missing Documents
        R->>R: 4.2.2 Re-validate
    end
    
    %% Phase 2: Review
    Note over C,R: Phase 2: Review Cycles
    
    par Parallel Checks
        rect rgb(240, 248, 255)
            Note right of R: Technical Review
            R->>R: 5.2.1 Check Compliance
        end
        
        rect rgb(255, 250, 240)
            Note right of R: Financial Review
            R->>R: Review Financials
            Note over R: 5.B.2 Invoice Sequence
            R->>R: POST Invoice (Binary/Resource)
            R->>R: POST DocumentReference
            R->>C: POST Payment Task (Input: DocRef)
            activate C
            Note over C: 5.B.3 Payment Sequence
            C->>C: POST Proof of Payment (Binary)
            C->>C: POST DocumentReference
            C-->>R: Update Task (Add Output DocRef)
            deactivate C
            R->>R: 5.B.4 Verify Proof & Set Task: completed
        end
    end
    
    loop Issue Resolution
        alt Issue Found
            Note over R: 5.3.1 Question Sequence
            R->>R: POST Questionnaire
            R->>R: POST DocumentReference
            R->>C: POST Question Task (Input: DocRef)
            activate C
            Note over C: 5.3.2 Response Sequence
            C->>C: POST QuestionnaireResponse
            C->>C: POST DocumentReference
            C-->>R: Update Task (Add Output DocRef)
            deactivate C
            R->>R: 5.3.3 Review & Set Task: completed
        else No Issues
            R->>R: Proceed to Decision
        end
    end
    
    %% Phase 3: Decision
    Note over C,R: Phase 3: Final Decision
    
    alt Approved
        R-->>C: 6.1 Notify Approval (Decision Letter)
    else Rejected
        R-->>C: 7.1 Notify Rejection
    end
    deactivate R
```

### subscriptions.html (#2) — [view page](https://build.fhir.org/ig/HL7/APIX---API-Exchange-for-Medicinal-Products/branches/draft-of-Developer-notes/subscriptions.html)

```mermaid
pie title Submission Status (Global)
    "In Progress (Clock On)" : 45
    "On Hold (Clock Stop)" : 15
    "Approved" : 30
    "Validation" : 10
```

### subscriptions.html (#3) — [view page](https://build.fhir.org/ig/HL7/APIX---API-Exchange-for-Medicinal-Products/branches/draft-of-Developer-notes/subscriptions.html)

```mermaid
gantt
    title Regulatory Procedure Timeline
    dateFormat  YYYY-MM-DD
    section Procedure A (Fast)
    Submission      :active,    p1, 2025-01-01, 3d
    Validation      :           p2, after p1, 5d
    Assessment      :           p3, after p2, 45d
    Decision        :crit,      p4, after p3, 5d
    section Procedure B (Delayed)
    Submission      :active,    p5, 2025-01-15, 3d
    Validation      :           p6, after p5, 5d
    Assessment      :           p7, after p6, 20d
    Clock Stop (Q&A):crit,      p8, after p7, 30d
    Response Review :           p9, after p8, 25d
    Decision        :           p10, after p9, 5d
```

### subscriptions.html (#4) — [view page](https://build.fhir.org/ig/HL7/APIX---API-Exchange-for-Medicinal-Products/branches/draft-of-Developer-notes/subscriptions.html)

```mermaid
pie title Avg. Duration by Phase (Days)
    "Validation" : 12
    "Assessment (Phase I)" : 75
    "Clock Stop (Company Time)" : 45
    "Final Decision" : 10
```

### architecture.html (#5) — [view page](https://build.fhir.org/ig/HL7/APIX---API-Exchange-for-Medicinal-Products/branches/draft-of-Developer-notes/architecture.html)

```mermaid
sequenceDiagram
    autonumber
    participant App as Applicant (RIM System)
    participant Auth as Auth Server (OAuth2)
    participant APIX as APIX FHIR Server
    participant Val as Validation Engine

    note over App, Val: Phase 1: Authentication & Submission
    
    App->>Auth: 1. Request Access Token
    Auth-->>App: 2. Return JWT (Scope: system/Task.cruds)
    
    App->>APIX: 3. POST /Task (Submission Bundle)
    APIX->>Val: 4. $validate Bundle
    Val-->>APIX: 5. Validation Outcome (Pass)
    APIX-->>App: 6. 201 Created (Task.status = received)

    note over App, Val: Phase 2: Asynchronous Processing & Notification

    APIX->>APIX: 7. Regulator Review (Status Change)
    
    par Real-Time Notification
        APIX->>App: 8. POST Subscription Notification (Task.status = in-progress)
    and Audit Logging
        APIX->>APIX: 9. Create Provenance Record
    end
```

## HL7/uv-pocd @ master

**Package:** `hl7.fhir.uv.pocd#1.0.0`

**Point-of-Care Device Implementation Guide**

[Build](https://build.fhir.org/ig/HL7/uv-pocd/branches/master) · [GitHub](https://github.com/HL7/uv-pocd/tree/master) · [Canonical](http://hl7.org/fhir/uv/pocd/ImplementationGuide/hl7.fhir.uv.pocd)

FHIR 4.0.1 · 2026-03-19

### overview.html — [view page](https://build.fhir.org/ig/HL7/uv-pocd/branches/master/overview.html)

```mermaid
graph TD
    MDS["Medical Device System MDS<br/>Overall device system<br/>Device model and serial number<br/>Configuration and state"]
    
    VMD1["Virtual Medical Device VMD<br/>Logical subsystem<br/>e.g., ECG module<br/>Model and serial number"]
    VMD2["Virtual Medical Device VMD<br/>Logical subsystem<br/>e.g., SpO2 module<br/>Model and serial number"]
    VMD3["Virtual Medical Device VMD<br/>Logical subsystem<br/>e.g., Infusion pump"]
    
    CH1["Channel<br/>Logical grouping<br/>e.g., Lead II"]
    CH2["Channel<br/>Logical grouping<br/>e.g., Lead III"]
    CH3["Channel<br/>Logical grouping"]
    CH4["Channel<br/>Logical grouping<br/>e.g., Infusion line 1"]
    
    M1["Metric<br/>Measurement/Observation<br/>e.g., Heart Rate"]
    M2["Metric<br/>Waveform<br/>e.g., ECG waveform"]
    M3["Metric<br/>Measurement<br/>e.g., SpO2 %"]
    M4["Metric<br/>Measurement<br/>e.g., Pulse Rate"]
    M5["Metric<br/>Setting<br/>e.g., Infusion Rate"]
    M6["Metric<br/>State<br/>e.g., Pump status"]
    
    MDS --> VMD1
    MDS --> VMD2
    MDS --> VMD3
    
    VMD1 --> CH1
    VMD1 --> CH2
    VMD2 --> CH3
    VMD3 --> CH4
    
    CH1 --> M1
    CH1 --> M2
    CH2 --> M3
    CH3 --> M4
    CH4 --> M5
    CH4 --> M6
    
    style MDS fill:#e1f5ff,stroke:#01579b,stroke-width:3px,color:#000
    style VMD1 fill:#b3e5fc,stroke:#0277bd,stroke-width:2px,color:#000
    style VMD2 fill:#b3e5fc,stroke:#0277bd,stroke-width:2px,color:#000
    style VMD3 fill:#b3e5fc,stroke:#0277bd,stroke-width:2px,color:#000
    style CH1 fill:#81d4fa,stroke:#0288d1,stroke-width:2px,color:#000
    style CH2 fill:#81d4fa,stroke:#0288d1,stroke-width:2px,color:#000
    style CH3 fill:#81d4fa,stroke:#0288d1,stroke-width:2px,color:#000
    style CH4 fill:#81d4fa,stroke:#0288d1,stroke-width:2px,color:#000
    style M1 fill:#4fc3f7,stroke:#0297d1,color:#000
    style M2 fill:#4fc3f7,stroke:#0297d1,color:#000
    style M3 fill:#4fc3f7,stroke:#0297d1,color:#000
    style M4 fill:#4fc3f7,stroke:#0297d1,color:#000
    style M5 fill:#4fc3f7,stroke:#0297d1,color:#000
    style M6 fill:#4fc3f7,stroke:#0297d1,color:#000
```

## hl7au/au-fhir-ps @ master

**Package:** `hl7.fhir.au.ps#1.0.0-ci-build`

**AU Patient Summary Implementation Guide**

[Build](https://build.fhir.org/ig/hl7au/au-fhir-ps/branches/master) · [GitHub](https://github.com/hl7au/au-fhir-ps/tree/master) · [Canonical](http://hl7.org.au/fhir/ps/ImplementationGuide/hl7.fhir.au.ps)

FHIR 4.0.1 · 2026-04-08

### uc-interstate.html (#1) — [view page](https://build.fhir.org/ig/hl7au/au-fhir-ps/branches/master/uc-interstate.html)

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  actor Attending GP as Attending GP
  participant Clinic CIS as Clinic CIS
  participant Patient Summary Host as Patient Summary Host
  Attending GP ->> Clinic CIS: Scan QR for Patient Summary access
  Clinic CIS ->> Patient Summary Host: Retrieve Patient Summary
  Attending GP ->> Clinic CIS: View Patient Summary
```

### uc-referral.html (#2) — [view page](https://build.fhir.org/ig/hl7au/au-fhir-ps/branches/master/uc-referral.html)

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  participant GP CIS as GP CIS
  actor Endocrinologist as Endocrinologist
  participant Endocrinologist CIS as Endocrinologist CIS
  Endocrinologist ->> Endocrinologist CIS: Access Referral and embedded Patient Summary
  Endocrinologist CIS ->> GP CIS: Check for updates and retrieve current Patient Summary
  Endocrinologist ->> Endocrinologist CIS: View current Patient Summary
```

## HL7Austria/ELGA-MOPED-R5 @ main

**Package:** `elga.moped#0.1.0`

**Moderne Patient:innenabrechnung und Datenkommunikation on FHIR (MOPED)**

[Build](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main) · [GitHub](https://github.com/HL7Austria/ELGA-MOPED-R5/tree/main) · [Canonical](https://elga.moped.at/ImplementationGuide/elga.moped)

FHIR 5.0.0 · 2026-04-08

### moped_konzepte.html (#1) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/moped_konzepte.html)

```mermaid
graph TD
    Master[MasterComposition]

    subgraph Spezialisierungen
        Aufnahme[AufnahmeComposition<br />Patient & Encounter vorhanden]
        Anfrage[AnfrageComposition<br />Versicherer vorhanden]
        Antwort[AntwortComposition<br />VAEResponse vorhanden]
        Entlassungsaviso[EntlassungsAvisoComposition<br />Entlassungsdatum vorhanden]
        Entlassung[EntlassungVollstaendigComposition<br />Entlassungsdatum und Hauptdiagnose vorhanden]
        Abrechnung[AbrechnungsComposition<br />Patient Entlassen, Diagnosen und Leistungen erfasst]
        Entscheiden[EntscheidenComposition<br />]
        Siegel[SiegelComposition<br />Composition.status=final]
    end

    Master --> Aufnahme
    Master --> Anfrage
    Master --> Antwort
    Master --> Entlassung
    Master --> Abrechnung
    Master --> Entscheiden
    Master --> Siegel
```

### moped_konzepte.html (#2) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/moped_konzepte.html)

```mermaid
graph TD
  CompV1[Composition/123/_history/1]
  CompV2[Composition/123/_history/2]
  CompV3[Composition/123/_history/3]

  Prov1[Provenance A]
  Prov2[Provenance B]
  Prov3[Provenance C]

  Prov1 --> CompV1
  Prov2 --> CompV2
  Prov3 --> CompV3
```

### actors.html (#3) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/actors.html)

```mermaid
graph LR
    KH[Krankenanstalt]
    Moped[Moped] 
    KH --->|POST $aufnehmen| Moped 
    KH -->|POST $update| Moped
    KH -->|POST $anfragen| Moped
    KH -->|POST $entlassen| Moped
    KH -->|POST $abrechnen| Moped
    KH -->|POST $stornieren| Moped
    KH -->|POST $einmelden| Moped
    Moped -->|GET VAEResponse| KH
    Moped --->|GET ClaimResponse| KH
```

### actors.html (#4) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/actors.html)

```mermaid
graph LR
    SV[Sozialversicherung]
    Moped[Moped] 
    Moped --->|GET VAERequest?status=active| SV
    Moped --->|GET ARKRequest?status=active| SV
    SV --->|POST $antworten| Moped
```

### actors.html (#5) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/actors.html)

```mermaid
graph LR
    LGF[Landesgesundheitsfonds]
    Moped[Moped] 
    Moped --->|GET Claim| LGF
    Moped --->|GET QuestionnaireResponse| LGF
    LGF --->|POST $entscheiden| Moped
    LGF --->|POST $melden| Moped
```

### actors.html (#6) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/actors.html)

```mermaid
graph LR
    BMSGPK[BMSGPK]
    Moped[Moped] 
    Moped --->|GET Composition?status=final| BMSGPK 
    Moped --->|POST Measure/$evaluate-measure| BMSGPK
```

### actors.html (#7) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/actors.html)

```mermaid
graph LR
    Register[Register]
    Moped[Moped] 
    KH[Krankenanstalt]
    KH --->|POST $update<br />einer fallbezogenen QuestionnaireResponse| Moped 
    Moped --->|GET QuestionnaireResponse| Register
```

### workflowmanagement.html (#8) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> partial : $aufnehmen (initiale Composition)
    partial --> partial : $update, $anfragen, $antworten, $abrechnen, $entscheiden, etc.
    partial --> final : Freigabe durch LGF
    
    partial --> entered_in_error : $stornieren
```

### workflowmanagement.html (#9) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> in_progress : $aufnehmen
    in_progress --> on_hold : Beurlaubung / temporäre Unterbrechung
    on_hold --> in_progress : Rückkehr aus Beurlaubung

    in_progress --> discharged : $update 
    discharged --> completed : Hauptdiagnose dokumentiert und $entlassen

    in_progress --> entered_in_error : $stornieren
    on_hold --> entered_in_error : $stornieren
    discharged --> entered_in_error : $stornieren
```

### workflowmanagement.html (#10) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> active : Ressource wird eingebracht

    active --> cancelled : Stornierung durch KH
    active --> entered_in_error : Fehler erkannt
    active --> [*] : Verarbeitet
```

### AF_moped_fall_prozessuebergreifend.html (#11) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/main/AF_moped_fall_prozessuebergreifend.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

## HL7Austria/ELGA-MOPED-R5 @ fix-main

**Package:** `elga.moped#0.1.0`

**Moderne Patient:innenabrechnung und Datenkommunikation on FHIR (MOPED)**

[Build](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main) · [GitHub](https://github.com/HL7Austria/ELGA-MOPED-R5/tree/fix-main) · [Canonical](https://elga.moped.at/ImplementationGuide/elga.moped)

FHIR 5.0.0 · 2026-03-29

### moped_konzepte.html (#1) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/moped_konzepte.html)

```mermaid
graph TD
    Master[MasterComposition]

    subgraph Spezialisierungen
        Aufnahme[AufnahmeComposition<br />Patient & Encounter vorhanden]
        Anfrage[AnfrageComposition<br />Versicherer vorhanden]
        Antwort[AntwortComposition<br />VAEResponse vorhanden]
        Entlassungsaviso[EntlassungsAvisoComposition<br />Entlassungsdatum vorhanden]
        Entlassung[EntlassungVollstaendigComposition<br />Entlassungsdatum und Hauptdiagnose vorhanden]
        Abrechnung[AbrechnungsComposition<br />Patient Entlassen, Diagnosen und Leistungen erfasst]
        Entscheiden[EntscheidenComposition<br />]
        Siegel[SiegelComposition<br />Composition.status=final]
    end

    Master --> Aufnahme
    Master --> Anfrage
    Master --> Antwort
    Master --> Entlassung
    Master --> Abrechnung
    Master --> Entscheiden
    Master --> Siegel
```

### moped_konzepte.html (#2) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/moped_konzepte.html)

```mermaid
graph TD
  CompV1[Composition/123/_history/1]
  CompV2[Composition/123/_history/2]
  CompV3[Composition/123/_history/3]

  Prov1[Provenance A]
  Prov2[Provenance B]
  Prov3[Provenance C]

  Prov1 --> CompV1
  Prov2 --> CompV2
  Prov3 --> CompV3
```

### actors.html (#3) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/actors.html)

```mermaid
graph LR
    KH[Krankenanstalt]
    Moped[Moped] 
    KH --->|POST $aufnehmen| Moped 
    KH -->|POST $update| Moped
    KH -->|POST $anfragen| Moped
    KH -->|POST $entlassen| Moped
    KH -->|POST $abrechnen| Moped
    KH -->|POST $stornieren| Moped
    KH -->|POST $einmelden| Moped
    Moped -->|GET VAEResponse| KH
    Moped --->|GET ClaimResponse| KH
```

### actors.html (#4) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/actors.html)

```mermaid
graph LR
    SV[Sozialversicherung]
    Moped[Moped] 
    Moped --->|GET VAERequest?status=active| SV
    Moped --->|GET ARKRequest?status=active| SV
    SV --->|POST $antworten| Moped
```

### actors.html (#5) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/actors.html)

```mermaid
graph LR
    LGF[Landesgesundheitsfonds]
    Moped[Moped] 
    Moped --->|GET Claim| LGF
    Moped --->|GET QuestionnaireResponse| LGF
    LGF --->|POST $entscheiden| Moped
    LGF --->|POST $melden| Moped
```

### actors.html (#6) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/actors.html)

```mermaid
graph LR
    BMSGPK[BMSGPK]
    Moped[Moped] 
    Moped --->|GET Composition?status=final| BMSGPK 
    Moped --->|POST Measure/$evaluate-measure| BMSGPK
```

### actors.html (#7) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/actors.html)

```mermaid
graph LR
    Register[Register]
    Moped[Moped] 
    KH[Krankenanstalt]
    KH --->|POST $update<br />einer fallbezogenen QuestionnaireResponse| Moped 
    Moped --->|GET QuestionnaireResponse| Register
```

### workflowmanagement.html (#8) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> partial : $aufnehmen (initiale Composition)
    partial --> partial : $update, $anfragen, $antworten, $abrechnen, $entscheiden, etc.
    partial --> final : Freigabe durch LGF
    
    partial --> entered_in_error : $stornieren
```

### workflowmanagement.html (#9) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> in_progress : $aufnehmen
    in_progress --> on_hold : Beurlaubung / temporäre Unterbrechung
    on_hold --> in_progress : Rückkehr aus Beurlaubung

    in_progress --> discharged : $update 
    discharged --> completed : Hauptdiagnose dokumentiert und $entlassen

    in_progress --> entered_in_error : $stornieren
    on_hold --> entered_in_error : $stornieren
    discharged --> entered_in_error : $stornieren
```

### workflowmanagement.html (#10) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> active : Ressource wird eingebracht

    active --> cancelled : Stornierung durch KH
    active --> entered_in_error : Fehler erkannt
    active --> [*] : Verarbeitet
```

### AF6.html (#11) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/AF6.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF28bis32.html (#12) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: POST VAERequest 1
    Note over KH: Anfrage VAE <br/>(ab 1.09.2025)
    SV->>MP: POST VAEResponse 1
    Note over SV: Bestätigung VAE <br/>(01.09.2025-16.09.2025)

    KH->>MP: POST VAERequest 2
    Note over KH: Anfrage Verlängerung<br/>mit Claim.related.claim zu VAERequest 1 und <br/> Claim.related.relationship = 'Verlängerung'<br/>(16.09.2025-21.09.2025 = Verlängerungstage)
    Note over MP: Moped behält die gültige Übernahme (VAEResponse 1)

    SV->>MP: POST VAEResponse 2
    Note over SV: Bestätigung Verlängerung<br/>(16.09.2025-21.09.2025)
    Note over MP: Moped behält die gültigen Übernahmen für beide Zeiträume<br/>(VAEResponse 1 & VAEResponse 2)
```

### AF28bis32.html (#13) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
    KH->>MP: Anfrage VAE <br/>POST VAERequest 1
    Note over KH: Anfrage auf Versicherungsanspruchserklärung 
    SV->>MP: VAEResponse 1<br/>(Status 03 'nicht leistungszuständig')
    Note over SV: Negative VAE
    Note over MP: durch negative Response wird der <br/>VAERequest 1 automatisch gecancelled
    alt Erneute Anfrage bei gleichem<br/> Träger mit anderen Daten
      KH->>MP: Anfrage VAE <br/>POST VAERequest 2
      Note over KH: KH stellt modifizierte Anfrage an ÖGK
    else Patient hat noch einen Anspruch bei <br/>einem anderen SV Träger (z.B. SVS)
      KH->>MP: $update mit SVS referenziert in der neuen Coverage
      Note over KH: KH setzt die SVS als zuständige Versicherung
      KH->>MP: Anfrage VAE <br/>POST VAERequest 2
      Note over KH: KH stellt neue Anfrage an SVS
    else  Patient wird zum Selbstzahler
      KH->>MP: $update mit Selbstzahler Coverage
      Note over KH: KH meldet Patienten als Selbstzahler 
    end
```

### AF28bis32.html (#14) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF28bis32.html (#15) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as MP
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF28bis32.html (#16) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/fix-main/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

## HL7Austria/ELGA-MOPED-R5 @ 607-Anwendungsfall-31---genehmigung-nach-ablehnung

**Package:** `elga.moped#0.1.0`

**Moderne Patient:innenabrechnung und Datenkommunikation on FHIR (MOPED)**

[Build](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung) · [GitHub](https://github.com/HL7Austria/ELGA-MOPED-R5/tree/607-Anwendungsfall-31---genehmigung-nach-ablehnung) · [Canonical](https://elga.moped.at/ImplementationGuide/elga.moped)

FHIR 5.0.0 · 2026-01-20

### moped_konzepte.html (#1) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/moped_konzepte.html)

```mermaid
graph TD
    Master[MasterComposition]

    subgraph Spezialisierungen
        Aufnahme[AufnahmeComposition<br />Patient & Encounter vorhanden]
        Anfrage[AnfrageComposition<br />Versicherer vorhanden]
        Antwort[AntwortComposition<br />VAEResponse vorhanden]
        Entlassungsaviso[EntlassungsAvisoComposition<br />Entlassungsdatum vorhanden]
        Entlassung[EntlassungVollstaendigComposition<br />Entlassungsdatum und Hauptdiagnose vorhanden]
        Abrechnung[AbrechnungsComposition<br />Patient Entlassen, Diagnosen und Leistungen erfasst]
        Entscheiden[EntscheidenComposition<br />]
        Siegel[SiegelComposition<br />Composition.status=final]
    end

    Master --> Aufnahme
    Master --> Anfrage
    Master --> Antwort
    Master --> Entlassung
    Master --> Abrechnung
    Master --> Entscheiden
    Master --> Siegel
```

### moped_konzepte.html (#2) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/moped_konzepte.html)

```mermaid
graph TD
  CompV1[Composition/123/_history/1]
  CompV2[Composition/123/_history/2]
  CompV3[Composition/123/_history/3]

  Prov1[Provenance A]
  Prov2[Provenance B]
  Prov3[Provenance C]

  Prov1 --> CompV1
  Prov2 --> CompV2
  Prov3 --> CompV3
```

### actors.html (#3) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/actors.html)

```mermaid
graph LR
    KH[Krankenanstalt]
    Moped[Moped] 
    KH --->|POST $aufnehmen| Moped 
    KH -->|POST $update| Moped
    KH -->|POST $anfragen| Moped
    KH -->|POST $entlassen| Moped
    KH -->|POST $abrechnen| Moped
    KH -->|POST $stornieren| Moped
    KH -->|POST $einmelden| Moped
    Moped -->|GET VAEResponse| KH
    Moped --->|GET ClaimResponse| KH
```

### actors.html (#4) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/actors.html)

```mermaid
graph LR
    SV[Sozialversicherung]
    Moped[Moped] 
    Moped --->|GET VAERequest?status=active| SV
    Moped --->|GET ARKRequest?status=active| SV
    SV --->|POST $antworten| Moped
```

### actors.html (#5) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/actors.html)

```mermaid
graph LR
    LGF[Landesgesundheitsfonds]
    Moped[Moped] 
    Moped --->|GET Claim| LGF
    Moped --->|GET QuestionnaireResponse| LGF
    LGF --->|POST $entscheiden| Moped
    LGF --->|POST $melden| Moped
```

### actors.html (#6) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/actors.html)

```mermaid
graph LR
    BMSGPK[BMSGPK]
    Moped[Moped] 
    Moped --->|GET Composition?status=final| BMSGPK 
    Moped --->|POST Measure/$evaluate-measure| BMSGPK
```

### actors.html (#7) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/actors.html)

```mermaid
graph LR
    Register[Register]
    Moped[Moped] 
    KH[Krankenanstalt]
    KH --->|POST $update<br />einer fallbezogenen QuestionnaireResponse| Moped 
    Moped --->|GET QuestionnaireResponse| Register
```

### workflowmanagement.html (#8) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> partial : $aufnehmen (initiale Composition)
    partial --> partial : $update, $anfragen, $antworten, $abrechnen, $entscheiden, etc.
    partial --> final : Freigabe durch LGF
    
    partial --> entered_in_error : $stornieren
```

### workflowmanagement.html (#9) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> in_progress : $aufnehmen
    in_progress --> on_hold : Beurlaubung / temporäre Unterbrechung
    on_hold --> in_progress : Rückkehr aus Beurlaubung

    in_progress --> discharged : $update 
    discharged --> completed : Hauptdiagnose dokumentiert und $entlassen

    in_progress --> entered_in_error : $stornieren
    on_hold --> entered_in_error : $stornieren
    discharged --> entered_in_error : $stornieren
```

### workflowmanagement.html (#10) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> active : Ressource wird eingebracht

    active --> cancelled : Stornierung durch KH
    active --> entered_in_error : Fehler erkannt
    active --> [*] : Verarbeitet
```

### AF6.html (#11) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/AF6.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF28bis32.html (#12) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/607-Anwendungsfall-31---genehmigung-nach-ablehnung/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

## HL7Austria/ELGA-MOPED-R5 @ 599-Falsche-0-0-Kardinalitäten-entfernen

**Package:** `elga.moped#0.1.0`

**Moderne Patient:innenabrechnung und Datenkommunikation on FHIR (MOPED)**

[Build](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen) · [GitHub](https://github.com/HL7Austria/ELGA-MOPED-R5/tree/599-Falsche-0-0-Kardinalitäten-entfernen) · [Canonical](https://elga.moped.at/ImplementationGuide/elga.moped)

FHIR 5.0.0 · 2026-01-20

### moped_konzepte.html (#1) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/moped_konzepte.html)

```mermaid
graph TD
    Master[MasterComposition]

    subgraph Spezialisierungen
        Aufnahme[AufnahmeComposition<br />Patient & Encounter vorhanden]
        Anfrage[AnfrageComposition<br />Versicherer vorhanden]
        Antwort[AntwortComposition<br />VAEResponse vorhanden]
        Entlassungsaviso[EntlassungsAvisoComposition<br />Entlassungsdatum vorhanden]
        Entlassung[EntlassungVollstaendigComposition<br />Entlassungsdatum und Hauptdiagnose vorhanden]
        Abrechnung[AbrechnungsComposition<br />Patient Entlassen, Diagnosen und Leistungen erfasst]
        Entscheiden[EntscheidenComposition<br />]
        Siegel[SiegelComposition<br />Composition.status=final]
    end

    Master --> Aufnahme
    Master --> Anfrage
    Master --> Antwort
    Master --> Entlassung
    Master --> Abrechnung
    Master --> Entscheiden
    Master --> Siegel
```

### moped_konzepte.html (#2) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/moped_konzepte.html)

```mermaid
graph TD
  CompV1[Composition/123/_history/1]
  CompV2[Composition/123/_history/2]
  CompV3[Composition/123/_history/3]

  Prov1[Provenance A]
  Prov2[Provenance B]
  Prov3[Provenance C]

  Prov1 --> CompV1
  Prov2 --> CompV2
  Prov3 --> CompV3
```

### actors.html (#3) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/actors.html)

```mermaid
graph LR
    KH[Krankenanstalt]
    Moped[Moped] 
    KH --->|POST $aufnehmen| Moped 
    KH -->|POST $update| Moped
    KH -->|POST $anfragen| Moped
    KH -->|POST $entlassen| Moped
    KH -->|POST $abrechnen| Moped
    KH -->|POST $stornieren| Moped
    KH -->|POST $einmelden| Moped
    Moped -->|GET VAEResponse| KH
    Moped --->|GET ClaimResponse| KH
```

### actors.html (#4) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/actors.html)

```mermaid
graph LR
    SV[Sozialversicherung]
    Moped[Moped] 
    Moped --->|GET VAERequest?status=active| SV
    Moped --->|GET ARKRequest?status=active| SV
    SV --->|POST $antworten| Moped
```

### actors.html (#5) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/actors.html)

```mermaid
graph LR
    LGF[Landesgesundheitsfonds]
    Moped[Moped] 
    Moped --->|GET Claim| LGF
    Moped --->|GET QuestionnaireResponse| LGF
    LGF --->|POST $entscheiden| Moped
    LGF --->|POST $melden| Moped
```

### actors.html (#6) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/actors.html)

```mermaid
graph LR
    BMSGPK[BMSGPK]
    Moped[Moped] 
    Moped --->|GET Composition?status=final| BMSGPK 
    Moped --->|POST Measure/$evaluate-measure| BMSGPK
```

### actors.html (#7) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/actors.html)

```mermaid
graph LR
    Register[Register]
    Moped[Moped] 
    KH[Krankenanstalt]
    KH --->|POST $update<br />einer fallbezogenen QuestionnaireResponse| Moped 
    Moped --->|GET QuestionnaireResponse| Register
```

### workflowmanagement.html (#8) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> partial : $aufnehmen (initiale Composition)
    partial --> partial : $update, $anfragen, $antworten, $abrechnen, $entscheiden, etc.
    partial --> final : Freigabe durch LGF
    
    partial --> entered_in_error : $stornieren
```

### workflowmanagement.html (#9) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> in_progress : $aufnehmen
    in_progress --> on_hold : Beurlaubung / temporäre Unterbrechung
    on_hold --> in_progress : Rückkehr aus Beurlaubung

    in_progress --> discharged : $update 
    discharged --> completed : Hauptdiagnose dokumentiert und $entlassen

    in_progress --> entered_in_error : $stornieren
    on_hold --> entered_in_error : $stornieren
    discharged --> entered_in_error : $stornieren
```

### workflowmanagement.html (#10) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> active : Ressource wird eingebracht

    active --> cancelled : Stornierung durch KH
    active --> entered_in_error : Fehler erkannt
    active --> [*] : Verarbeitet
```

### anwendungsfaelle.html (#11) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/anwendungsfaelle.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
    
    KH->> MP: $aufnehmen
    Note over KH: Susi Sonnenschein wird aufgenommen

    KH->>MP: $update
    Note over KH: ÖGK Wien als zuständige Versicherung gesetzt

    KH->>MP: $anfragen
    Note over KH: Anfrage auf Versicherungsanspruchserklärung 

    SV->>MP: $antworten (Status 00)
    Note over SV: Fallübernahme bestätigt (Status 00) 

    KH->>MP: $update
    Note over KH: Verlegung auf Abteilung Innere Medizin 

    KH->>MP: $update
    Note over KH: Diagnose „Herzinsuffizienz“ und Leistung „EKG“ erfasst 

    KH->>MP: $entlassen
    Note over KH: Susi Sonnenschein wird entlassen 
    loop $abrechnen / $entscheiden (vorläufig)
        KH->>MP:$abrechnen 
        Note over KH: Abrechnung aller Leistungen eingereicht
        LGF-->>MP: $entscheiden 
        Note over LGF: Alle Posten genehmigt (keine Änderungen)
    end

    %% Finale Abrechnung und Entscheidung
    KH->>MP: final $abrechnen 
    Note over KH: Finale Abrechnung nach Entlassung

    LGF->>MP: final $entscheiden
    Note over LGF: Endgültige Entscheidung zur Abrechnung 
    Note over LGF: Kosteninformation wird übermittelt 

    Bund->>MP: GET Composition?status=final
    Note over Bund: Zugriff auf finale Composition 

    SV->>MP: $antworten
    Note over SV: Rückmeldung zur Kosteninformation

    Note over MP: Fall für Moped abgeschlossen
```

### AF2.html (#12) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF2.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH ->> MP: $aufnehmen
    Note over KH: Patient wird aufgenommen
```

### AF6.html (#13) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF6.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF14.html (#14) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF14.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: $aufnehmen
    Note over KH: Patient wird aufgenommen (mit einer Selbstzahler-Coverage)

    KH->>MP: $update
    Note over KH: Verlegung auf Abteilung Innere Medizin

    KH->>MP: $update
    Note over KH: Diagnose „Herzinsuffizienz“ und Leistung „EKG“ erfasst 

    KH->>MP: $entlassen
    Note over KH: Patient wird entlassen 

    loop $abrechnen / $entscheiden (vorläufig)
        KH->>MP: $abrechnen
        Note over KH: Abrechnung aller Leistungen eingereicht 

        LGF->>MP: $entscheiden
        Note over LGF: Alle Posten genehmigt (keine Änderungen)
    end 

    %% Finale Abrechnung und Entscheidung
    KH->>MP: final $abrechnen
    Note over KH: Finale Abrechnung nach Entlassung

    LGF->>MP: final $entscheiden
    Note over LGF: Endgültige Entscheidung zur Abrechnung 

    Bund->>MP: GET Composition?status=final
    Note over Bund: Zugriff auf finale Composition
```

### AF17.html (#15) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF17.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KHB as KH B
    end
    box rgb(245, 229, 153)
    actor KHA as KH A
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KHA->>MP: $aufnehmen
    Note over KHA: Patient wird aufgenommen
    KHA-->>KHB: Patient wird ins KH B gebracht
    Note over KHA: Patient muss für Diagnostik in das KH B
    KHB-->>KHA: Patient wird zurück ins KH A gebracht
    Note over KHB: Diagnostik durchgeführt
    KHA->>MP: $update
    Note over KHA: KH A meldet die Leistung an Moped<br /> -> gibt im Procedure statt einer Referenz auf die <br /> eigene Abteilung eine Referenz auf KH B an
```

### AF19.html (#16) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF19.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    %% Aufnahme
    KH->>MP: $aufnehmen
    Note over KH: POST Patient, Encounter, ... <br />TransferEncounter mit Referenz auf Aufnahmeabteilung

    %% Interne Verlegung
    KH->>MP: $update – interne Verlegung
    Note over KH: PUT alter TransferEncounter (finished, Enddatum) <br />+ POST neuer TransferEncounter (neue Abteilung)
```

### AF20.html (#17) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF20.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: $aufnehmen
    Note over KH: Patient:in wird am 2025-07-20 auf Abteilung „Innere Medizin“ aufgenommen<br />→ Encounter status: in-progress <br /> TransferEncounter Abteilung: "Innere Medizin"

    loop Beurlaubungs-Zyklus
        KH->>MP: $update 
        Note over KH: Patient:in am 2025-07-22 auf Urlaub<br />→ Encounter status: on-hold <br />Verlegung auf TransferEncounter mit Funktionscode 100000

        KH->>MP: $update 
        Note over KH:Patient:in kehrt am 2025-07-24 zurück <br />→ Encounter status: in-progress <br />TransferEncounter Abteilung: „Innere Medizin“
    end
```

### AF23bis25.html (#18) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF23bis25.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: $entlassen
    Note over KH: Patient wird entlassen und im gleichen Aufruf<br /> die Hauptdiagnose mitgeliefert
```

### AF23bis25.html (#19) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF23bis25.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 245, 188)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: $aufnehmen
    Note over KH: Patient:in wird aufgenommen<br />(Encounter status: in-progress)

    KH->>MP: $update
    Note over KH: Encounter-Status auf "discharged" gesetzt<br />(noch ohne Hauptdiagnose aka "Entlassungs-Aviso")

    KH->>MP: $update 
    Note over KH: Hauptdiagnose „Herzinsuffizienz“ ergänzt

    KH->>MP: $entlassen
    Note over KH: Encounter-Status final auf "completed" gesetzt
```

### AF28bis32.html (#20) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: POST VAERequest 1
    Note over KH: Anfrage VAE <br/>(ab 1.09.2025)
    SV->>MP: POST VAEResponse 1
    Note over SV: Bestätigung VAE <br/>(01.09.2025-16.09.2025)

    KH->>MP: POST VAERequest 2
    Note over KH: Anfrage Verlängerung<br/>mit Claim.related.claim zu VAERequest 1 und <br/> Claim.related.relationship = 'Verlängerung'<br/>(16.09.2025-21.09.2025 = Verlängerungstage)
    Note over MP: Moped behält die gültige Übernahme (VAEResponse 1)

    SV->>MP: POST VAEResponse 2
    Note over SV: Bestätigung Verlängerung<br/>(16.09.2025-21.09.2025)
    Note over MP: Moped behält die gültigen Übernahmen für beide Zeiträume<br/>(VAEResponse 1 & VAEResponse 2)
```

### AF28bis32.html (#21) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
    KH->>MP: Anfrage VAE <br/>POST VAERequest 1
    Note over KH: Anfrage auf Versicherungsanspruchserklärung 
    SV->>MP: VAEResponse 1<br/>(Status 03 'nicht leistungszuständig')
    Note over SV: Negative VAE
    Note over MP: durch negative Response wird der <br/>VAERequest 1 automatisch gecancelled
    alt Erneute Anfrage bei gleichem<br/> Träger mit anderen Daten
      KH->>MP: Anfrage VAE <br/>POST VAERequest 2
      Note over KH: KH stellt modifizierte Anfrage an ÖGK
    else Patient hat noch einen Anspruch bei <br/>einem anderen SV Träger (z.B. SVS)
      KH->>MP: $update mit SVS referenziert in der neuen Coverage
      Note over KH: KH setzt die SVS als zuständige Versicherung
      KH->>MP: Anfrage VAE <br/>POST VAERequest 2
      Note over KH: KH stellt neue Anfrage an SVS
    else  Patient wird zum Selbstzahler
      KH->>MP: $update mit Selbstzahler Coverage
      Note over KH: KH meldet Patienten als Selbstzahler 
    end
```

### AF28bis32.html (#22) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF28bis32.html (#23) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as MP
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF28bis32.html (#24) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/599-Falsche-0-0-Kardinalitäten-entfernen/AF28bis32.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

## HL7Austria/ELGA-MOPED-R5 @ 770-aufnehmen-puzzleteil

**Package:** `elga.moped#0.1.0`

**Moderne Patient:innenabrechnung und Datenkommunikation on FHIR (MOPED)**

[Build](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil) · [GitHub](https://github.com/HL7Austria/ELGA-MOPED-R5/tree/770-aufnehmen-puzzleteil) · [Canonical](https://elga.moped.at/ImplementationGuide/elga.moped)

FHIR 5.0.0 · 2026-04-07

### moped_konzepte.html (#1) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/moped_konzepte.html)

```mermaid
graph TD
    Master[MasterComposition]

    subgraph Spezialisierungen
        Aufnahme[AufnahmeComposition<br />Patient & Encounter vorhanden]
        Anfrage[AnfrageComposition<br />Versicherer vorhanden]
        Antwort[AntwortComposition<br />VAEResponse vorhanden]
        Entlassungsaviso[EntlassungsAvisoComposition<br />Entlassungsdatum vorhanden]
        Entlassung[EntlassungVollstaendigComposition<br />Entlassungsdatum und Hauptdiagnose vorhanden]
        Abrechnung[AbrechnungsComposition<br />Patient Entlassen, Diagnosen und Leistungen erfasst]
        Entscheiden[EntscheidenComposition<br />]
        Siegel[SiegelComposition<br />Composition.status=final]
    end

    Master --> Aufnahme
    Master --> Anfrage
    Master --> Antwort
    Master --> Entlassung
    Master --> Abrechnung
    Master --> Entscheiden
    Master --> Siegel
```

### moped_konzepte.html (#2) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/moped_konzepte.html)

```mermaid
graph TD
  CompV1[Composition/123/_history/1]
  CompV2[Composition/123/_history/2]
  CompV3[Composition/123/_history/3]

  Prov1[Provenance A]
  Prov2[Provenance B]
  Prov3[Provenance C]

  Prov1 --> CompV1
  Prov2 --> CompV2
  Prov3 --> CompV3
```

### actors.html (#3) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/actors.html)

```mermaid
graph LR
    KH[Krankenanstalt]
    Moped[Moped] 
    KH --->|POST $aufnehmen| Moped 
    KH -->|POST $update| Moped
    KH -->|POST $anfragen| Moped
    KH -->|POST $entlassen| Moped
    KH -->|POST $abrechnen| Moped
    KH -->|POST $stornieren| Moped
    KH -->|POST $einmelden| Moped
    Moped -->|GET VAEResponse| KH
    Moped --->|GET ClaimResponse| KH
```

### actors.html (#4) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/actors.html)

```mermaid
graph LR
    SV[Sozialversicherung]
    Moped[Moped] 
    Moped --->|GET VAERequest?status=active| SV
    Moped --->|GET ARKRequest?status=active| SV
    SV --->|POST $antworten| Moped
```

### actors.html (#5) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/actors.html)

```mermaid
graph LR
    LGF[Landesgesundheitsfonds]
    Moped[Moped] 
    Moped --->|GET Claim| LGF
    Moped --->|GET QuestionnaireResponse| LGF
    LGF --->|POST $entscheiden| Moped
    LGF --->|POST $melden| Moped
```

### actors.html (#6) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/actors.html)

```mermaid
graph LR
    BMSGPK[BMSGPK]
    Moped[Moped] 
    Moped --->|GET Composition?status=final| BMSGPK 
    Moped --->|POST Measure/$evaluate-measure| BMSGPK
```

### actors.html (#7) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/actors.html)

```mermaid
graph LR
    Register[Register]
    Moped[Moped] 
    KH[Krankenanstalt]
    KH --->|POST $update<br />einer fallbezogenen QuestionnaireResponse| Moped 
    Moped --->|GET QuestionnaireResponse| Register
```

### workflowmanagement.html (#8) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> partial : $aufnehmen (initiale Composition)
    partial --> partial : $update, $anfragen, $antworten, $abrechnen, $entscheiden, etc.
    partial --> final : Freigabe durch LGF
    
    partial --> entered_in_error : $stornieren
```

### workflowmanagement.html (#9) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> in_progress : $aufnehmen
    in_progress --> on_hold : Beurlaubung / temporäre Unterbrechung
    on_hold --> in_progress : Rückkehr aus Beurlaubung

    in_progress --> discharged : $update 
    discharged --> completed : Hauptdiagnose dokumentiert und $entlassen

    in_progress --> entered_in_error : $stornieren
    on_hold --> entered_in_error : $stornieren
    discharged --> entered_in_error : $stornieren
```

### workflowmanagement.html (#10) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/workflowmanagement.html)

```mermaid
stateDiagram-v2
    [*] --> active : Ressource wird eingebracht

    active --> cancelled : Stornierung durch KH
    active --> entered_in_error : Fehler erkannt
    active --> [*] : Verarbeitet
```

### AF_moped_fall_vae.html (#11) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/AF_moped_fall_vae.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end

    KH->>MP: POST VAERequest 1
    Note over KH: Anfrage VAE <br/>(ab 1.09.2025)
    SV->>MP: POST VAEResponse 1
    Note over SV: Bestätigung VAE <br/>(01.09.2025-16.09.2025)

    KH->>MP: POST VAERequest 2
    Note over KH: Anfrage Verlängerung<br/>mit Claim.related.claim zu VAERequest 1 und <br/> Claim.related.relationship = 'Verlängerung'<br/>(16.09.2025-21.09.2025 = Verlängerungstage)
    Note over MP: Moped behält die gültige Übernahme (VAEResponse 1)

    SV->>MP: POST VAEResponse 2
    Note over SV: Bestätigung Verlängerung<br/>(16.09.2025-21.09.2025)
    Note over MP: Moped behält die gültigen Übernahmen für beide Zeiträume<br/>(VAEResponse 1 & VAEResponse 2)
```

### AF_moped_fall_vae.html (#12) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/AF_moped_fall_vae.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
    KH->>MP: Anfrage VAE <br/>POST VAERequest 1
    Note over KH: Anfrage auf Versicherungsanspruchserklärung 
    SV->>MP: VAEResponse 1<br/>(Status 03 'nicht leistungszuständig')
    Note over SV: Negative VAE
    Note over MP: durch negative Response wird der <br/>VAERequest 1 automatisch gecancelled
    alt Erneute Anfrage bei gleichem<br/> Träger mit anderen Daten
      KH->>MP: Anfrage VAE <br/>POST VAERequest 2
      Note over KH: KH stellt modifizierte Anfrage an ÖGK
    else Patient hat noch einen Anspruch bei <br/>einem anderen SV Träger (z.B. SVS)
      KH->>MP: $update mit SVS referenziert in der neuen Coverage
      Note over KH: KH setzt die SVS als zuständige Versicherung
      KH->>MP: Anfrage VAE <br/>POST VAERequest 2
      Note over KH: KH stellt neue Anfrage an SVS
    else  Patient wird zum Selbstzahler
      KH->>MP: $update mit Selbstzahler Coverage
      Note over KH: KH meldet Patienten als Selbstzahler 
    end
```

### AF_moped_fall_vae.html (#13) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/AF_moped_fall_vae.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF_moped_fall_vae.html (#14) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/AF_moped_fall_vae.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as MP
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF_moped_fall_vae.html (#15) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/AF_moped_fall_vae.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

### AF_moped_fall_prozessuebergreifend.html (#16) — [view page](https://build.fhir.org/ig/HL7Austria/ELGA-MOPED-R5/branches/770-aufnehmen-puzzleteil/AF_moped_fall_prozessuebergreifend.html)

```mermaid
---
    config:
      theme: 'base'
      themeVariables:
        primaryColor: '#dbdbdb'         
        actorBorder: '#666'
        noteBkgColor: '#f4f4f4'
        noteBorderColor: '#555'
    ---
    sequenceDiagram
    autonumber
    box rgb(245, 229, 153)
    actor KH as KH (Herz Jesu Krankenhaus)
    end
    box rgb(197, 247, 186)
    participant MP as Moped
    end
    box rgb(186, 196, 247)
    actor SV as SV (ÖGK Wien)
    end
    box rgb(247, 208, 186)
    actor LGF as LGF (Landesgesundheitsfonds Wien)
    end
    box rgb(252, 179, 179) 
    actor Bund as Bund 
    end
```

## IHE/ITI.DeIdHandbook @ main

**Package:** `ihe.iti.deid#0.0.1-current`

**De-Identification Profile**

[Build](https://build.fhir.org/ig/IHE/ITI.DeIdHandbook/branches/main) · [GitHub](https://github.com/IHE/ITI.DeIdHandbook/tree/main) · [Canonical](https://profiles.ihe.net/ITI/DeId/ImplementationGuide/ihe.iti.deid)

FHIR 4.0.1 · 2026-03-19

### process.html — [view page](https://build.fhir.org/ig/IHE/ITI.DeIdHandbook/branches/main/process.html)

```mermaid
graph TD
    subgraph "Stage 1: Preliminary De-Identification"
        direction LR
        A[Identified Data] -->|Reversible Pseudonymization| B(Reversible-Pseudonymized Data);
    end

    subgraph "Stage 2: Advanced De-Identification"
        direction LR
        B -->|Irreversible Pseudonymization| C(Irreversibly Pseudonymized Data);
        C -->|Anonymization / Negligible Risk| D(Anonymous Data);
    end
    
    subgraph "Stage 3: Recipient Verification"
        direction LR
        D --> E(Recipient Risk Verification);
        C -->|Anonymization / Non-Negligible Risk| E;
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#ccf,stroke:#333,stroke-width:2px
    style D fill:#9c9,stroke:#333,stroke-width:2px
    style E fill:#f5f5f5,stroke:#333,stroke-width:2px
```

## IKNL/PZP-FHIR-R4 @ issue137-legallycapable

**Package:** `iknl.fhir.r4.pzp#1.0.0-rc2`

**Advance Care Planning (PZP)**

[Build](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/issue137-legallycapable) · [GitHub](https://github.com/IKNL/PZP-FHIR-R4/tree/issue137-legallycapable) · [Canonical](https://api.iknl.nl/docs/pzp/r4/ImplementationGuide/iknl.fhir.r4.pzp)

FHIR 4.0.1 · 2026-04-13

### data-model.html (#1) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/issue137-legallycapable/data-model.html)

```mermaid
flowchart TB

    %% ---- Style Definitions for Categories ----
    classDef C0 fill:#e6f3ff,stroke:#b3d9ff,color:#000
    classDef C1 fill:#e6ffe6,stroke:#b3ffb3,color:#000
    classDef C2 fill:#fff5e6,stroke:#ffddb3,color:#000
    classDef C3 fill:#f0e6ff,stroke:#d9b3ff,color:#000
    classDef C4 fill:#f2f2f2,stroke:#cccccc,color:#000

    %% ---- Subgraph Definitions ----
    subgraph "CommunicationRequest"
        ACPInformRelativesRequest
    end

    subgraph "Consent"
        ACPAdvanceDirective
        ACPTreatmentDirective
    end

    subgraph "Device"
        ACPMedicalDeviceProductICD
    end

    subgraph "DeviceUseStatement"
        ACPMedicalDevice
    end

    subgraph "Encounter"
        ACPEncounter
    end

    subgraph "Goal"
        ACPMedicalPolicyGoal
    end

    subgraph "Patient"
        ACPPatient
    end

    subgraph "Practitioner"
        ACPHealthProfessionalPractitioner
    end

    subgraph "PractitionerRole"
        ACPHealthProfessionalPractitionerRole
    end

    subgraph "Procedure"
        ACPProcedure
    end

    subgraph "RelatedPerson"
        ACPContactPerson
    end

    subgraph "Observation"
        ACPOrganDonationChoiceRegistration
        ACPPositionRegardingEuthanasia
        ACPPreferredPlaceOfDeath
        ACPSenseOfPurpose
        ACPSpecificCareWishes
    end

    %% ---- Style Assignments ----
    class ACPInformRelativesRequest C2
    class ACPAdvanceDirective C0
    class ACPTreatmentDirective C0
    class ACPMedicalDeviceProductICD C2
    class ACPMedicalDevice C2
    class ACPEncounter C3
    class ACPMedicalPolicyGoal C0
    class ACPSpecificCareWishes C0
    class ACPPreferredPlaceOfDeath C0
    class ACPPositionRegardingEuthanasia C0
    class ACPOrganDonationChoiceRegistration C0
    class ACPSenseOfPurpose C0
    class ACPPatient C1
    class ACPHealthProfessionalPractitioner C1
    class ACPHealthProfessionalPractitionerRole C1
    class ACPProcedure C3
    class ACPContactPerson C1

    %% ---- Resource Type References ----
    CommunicationRequest -- "encounter" --> Encounter
    CommunicationRequest -- "sender, subject" --> Patient
    CommunicationRequest -- "requester" --> PractitionerRole
    CommunicationRequest -- "recipient" --> RelatedPerson
    Consent -- "patient, provision.actor" --> Patient
    Consent -- "provision.actor" --> PractitionerRole
    Consent -- "provision.actor" --> RelatedPerson
    DeviceUseStatement -- "device" --> Device
    DeviceUseStatement -- "subject" --> Patient
    DeviceUseStatement -- "extension" --> PractitionerRole
    Encounter -- "subject" --> Patient
    Encounter -- "participant" --> PractitionerRole
    Encounter -- "reasonReference" --> Procedure
    Encounter -- "participant" --> RelatedPerson
    Goal -- "subject" --> Patient
    Observation -- "encounter" --> Encounter
    Observation -- "subject" --> Patient
    Observation -- "performer" --> PractitionerRole
    Patient -- "contact.extension" --> RelatedPerson
    PractitionerRole -- "practitioner" --> Practitioner
    Procedure -- "encounter" --> Encounter
    Procedure -- "performer, subject" --> Patient
    Procedure -- "performer" --> PractitionerRole
    Procedure -- "performer" --> RelatedPerson
    RelatedPerson -- "patient" --> Patient
```

### data-exchange.html (#2) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/issue137-legallycapable/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br />(Client)
    participant S as ACP Actor Provider<br />(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
  
        par 
            %% 1. Procedures
            C->>S: GET /Procedure?patient=Patient/[id]<br />&code=sct|713603004<br />&_include=Procedure:encounter
            activate S
            S-->>C: 200 OK: Bundle (Procedure + Encounter)
            deactivate S
        and
            %% 2. Consent (TreatmentDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|treatment<br />&category=http://snomed.info/sct|129125009<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 3. Consent (AdvanceCareDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|adr<br />&category=http://terminology.hl7.org/CodeSystem/consentcategorycodes|acd<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 4. Goals
            C->>S: GET /Goal?patient=Patient/[id]<br />&category=http://snomed.info/sct|713603004
            activate S
            S-->>C: 200 OK: Bundle (Goal)
            deactivate S
        and
            %% 5. Observations
            C->>S: GET /Observation?patient=Patient/[id]<br />&code=http://snomed.info/sct|153851000146100,395091006,340171000146104,247751003
            activate S
            S-->>C: 200 OK: Bundle (Observation)
            deactivate S
        and
            %% 6. Devices
            C->>S: GET /DeviceUseStatement?patient=Patient/[id]<br />&device.type=http://snomed.info/sct|72506001,465460004,468542000,704707009,1263462004,1236894001<br />&_include=DeviceUseStatement:device
            activate S
            S-->>C: 200 OK: Bundle (DeviceUseStatement + Device)
            deactivate S
        and
            %% 7. CommunicationRequests
            C->>S: GET /CommunicationRequest?patient=Patient/[id]<br />&category=http://snomed.info/sct|223449006
            activate S
            S-->>C: 200 OK: Bundle (CommunicationRequest)
            deactivate S
        end
    end

    opt Resolve Additional References
        note over C: If resources contain unresolved references<br />(e.g., to Practitioner), Client performs subsequent GETs
        C->>S: GET [Reference URL]
        S-->>C: 200 OK (Referenced Resource)
    end
```

### data-exchange.html (#3) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/issue137-legallycapable/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br>(Client)
    participant S as ACP Actor Provider<br>(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
        
        C->>S: GET /QuestionnaireResponse?subject=Patient/[id]<br>&questionnaire=https://api.iknl.nl/docs/pzp/r4/Questionnaire/ACP-zib2020
        activate S

        S-->>C: 200 OK: Bundle (QuestionnaireResponse)

        deactivate S
    end
```

## IKNL/PZP-FHIR-R4 @ update-questionnaire

**Package:** `iknl.fhir.r4.pzp#1.0.0-rc1`

**Advance Care Planning (PZP)**

[Build](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/update-questionnaire) · [GitHub](https://github.com/IKNL/PZP-FHIR-R4/tree/update-questionnaire) · [Canonical](https://api.iknl.nl/docs/pzp/r4/ImplementationGuide/iknl.fhir.r4.pzp)

FHIR 4.0.1 · 2026-03-02

### data-model.html (#1) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/update-questionnaire/data-model.html)

```mermaid
flowchart TB

    %% ---- Style Definitions for Categories ----
    classDef C0 fill:#e6f3ff,stroke:#b3d9ff,color:#000
    classDef C1 fill:#e6ffe6,stroke:#b3ffb3,color:#000
    classDef C2 fill:#fff5e6,stroke:#ffddb3,color:#000
    classDef C3 fill:#f0e6ff,stroke:#d9b3ff,color:#000
    classDef C4 fill:#f2f2f2,stroke:#cccccc,color:#000

    %% ---- Subgraph Definitions ----
    subgraph "CommunicationRequest"
        ACPInformRelativesRequest
    end

    subgraph "Consent"
        ACPAdvanceDirective
        ACPTreatmentDirective
    end

    subgraph "Device"
        ACPMedicalDeviceProductICD
    end

    subgraph "DeviceUseStatement"
        ACPMedicalDevice
    end

    subgraph "Encounter"
        ACPEncounter
    end

    subgraph "Goal"
        ACPMedicalPolicyGoal
    end

    subgraph "Patient"
        ACPPatient
    end

    subgraph "Practitioner"
        ACPHealthProfessionalPractitioner
    end

    subgraph "PractitionerRole"
        ACPHealthProfessionalPractitionerRole
    end

    subgraph "Procedure"
        ACPProcedure
    end

    subgraph "RelatedPerson"
        ACPContactPerson
    end

    subgraph "Observation"
        ACPOrganDonationChoiceRegistration
        ACPPositionRegardingEuthanasia
        ACPPreferredPlaceOfDeath
        ACPSenseOfPurpose
        ACPSpecificCareWishes
    end

    %% ---- Style Assignments ----
    class ACPInformRelativesRequest C2
    class ACPAdvanceDirective C0
    class ACPTreatmentDirective C0
    class ACPMedicalDeviceProductICD C2
    class ACPMedicalDevice C2
    class ACPEncounter C3
    class ACPMedicalPolicyGoal C0
    class ACPSpecificCareWishes C0
    class ACPPreferredPlaceOfDeath C0
    class ACPPositionRegardingEuthanasia C0
    class ACPOrganDonationChoiceRegistration C0
    class ACPSenseOfPurpose C0
    class ACPPatient C1
    class ACPHealthProfessionalPractitioner C1
    class ACPHealthProfessionalPractitionerRole C1
    class ACPProcedure C3
    class ACPContactPerson C1

    %% ---- Resource Type References ----
    CommunicationRequest -- "encounter" --> Encounter
    CommunicationRequest -- "sender, subject" --> Patient
    CommunicationRequest -- "requester" --> PractitionerRole
    CommunicationRequest -- "recipient" --> RelatedPerson
    Consent -- "patient, provision.actor" --> Patient
    Consent -- "provision.actor" --> PractitionerRole
    Consent -- "provision.actor" --> RelatedPerson
    DeviceUseStatement -- "device" --> Device
    DeviceUseStatement -- "subject" --> Patient
    DeviceUseStatement -- "extension" --> PractitionerRole
    Encounter -- "subject" --> Patient
    Encounter -- "participant" --> PractitionerRole
    Encounter -- "reasonReference" --> Procedure
    Encounter -- "participant" --> RelatedPerson
    Goal -- "subject" --> Patient
    Observation -- "encounter" --> Encounter
    Observation -- "subject" --> Patient
    Observation -- "performer" --> PractitionerRole
    Patient -- "contact.extension" --> RelatedPerson
    PractitionerRole -- "practitioner" --> Practitioner
    Procedure -- "encounter" --> Encounter
    Procedure -- "performer, subject" --> Patient
    Procedure -- "performer" --> PractitionerRole
    Procedure -- "performer" --> RelatedPerson
    RelatedPerson -- "patient" --> Patient
```

### data-exchange.html (#2) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/update-questionnaire/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br />(Client)
    participant S as ACP Actor Provider<br />(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
  
        par 
            %% 1. Procedures
            C->>S: GET /Procedure?patient=Patient/[id]<br />&code=sct|713603004<br />&_include=Procedure:encounter
            activate S
            S-->>C: 200 OK: Bundle (Procedure + Encounter)
            deactivate S
        and
            %% 2. Consent (TreatmentDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|treatment<br />&category=http://snomed.info/sct|129125009<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 3. Consent (AdvanceCareDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|adr<br />&category=http://terminology.hl7.org/CodeSystem/consentcategorycodes|acd<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 4. Goals
            C->>S: GET /Goal?patient=Patient/[id]<br />&description=http://snomed.info/sct|385987000,1351964001,713148004
            activate S
            S-->>C: 200 OK: Bundle (Goal)
            deactivate S
        and
            %% 5. Observations
            C->>S: GET /Observation?patient=Patient/[id]<br />&code=http://snomed.info/sct|153851000146100,395091006,340171000146104,247751003
            activate S
            S-->>C: 200 OK: Bundle (Observation)
            deactivate S
        and
            %% 6. Devices
            C->>S: GET /DeviceUseStatement?patient=Patient/[id]<br />&device.type=http://snomed.info/sct|72506001,465460004,468542000,704707009,1263462004,1236894001<br />&_include=DeviceUseStatement:device
            activate S
            S-->>C: 200 OK: Bundle (DeviceUseStatement + Device)
            deactivate S
        and
            %% 7. CommunicationRequests
            C->>S: GET /CommunicationRequest?patient=Patient/[id]<br />&category=http://snomed.info/sct|713603004
            activate S
            S-->>C: 200 OK: Bundle (CommunicationRequest)
            deactivate S
        end
    end

    opt Resolve Additional References
        note over C: If resources contain unresolved references<br />(e.g., to Practitioner), Client performs subsequent GETs
        C->>S: GET [Reference URL]
        S-->>C: 200 OK (Referenced Resource)
    end
```

### data-exchange.html (#3) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/update-questionnaire/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br>(Client)
    participant S as ACP Actor Provider<br>(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
        
        C->>S: GET /QuestionnaireResponse?subject=Patient/[id]<br>&questionnaire=https://api.iknl.nl/docs/pzp/r4/Questionnaire/ACP-zib2020
        activate S

        S-->>C: 200 OK: Bundle (QuestionnaireResponse)

        deactivate S
    end
```

## IKNL/PZP-FHIR-R4 @ main

**Package:** `iknl.fhir.r4.pzp#1.0.0-rc2`

**Advance Care Planning (PZP)**

[Build](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/main) · [GitHub](https://github.com/IKNL/PZP-FHIR-R4/tree/main) · [Canonical](https://api.iknl.nl/docs/pzp/r4/ImplementationGuide/iknl.fhir.r4.pzp)

FHIR 4.0.1 · 2026-03-03

### data-model.html (#1) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/main/data-model.html)

```mermaid
flowchart TB

    %% ---- Style Definitions for Categories ----
    classDef C0 fill:#e6f3ff,stroke:#b3d9ff,color:#000
    classDef C1 fill:#e6ffe6,stroke:#b3ffb3,color:#000
    classDef C2 fill:#fff5e6,stroke:#ffddb3,color:#000
    classDef C3 fill:#f0e6ff,stroke:#d9b3ff,color:#000
    classDef C4 fill:#f2f2f2,stroke:#cccccc,color:#000

    %% ---- Subgraph Definitions ----
    subgraph "CommunicationRequest"
        ACPInformRelativesRequest
    end

    subgraph "Consent"
        ACPAdvanceDirective
        ACPTreatmentDirective
    end

    subgraph "Device"
        ACPMedicalDeviceProductICD
    end

    subgraph "DeviceUseStatement"
        ACPMedicalDevice
    end

    subgraph "Encounter"
        ACPEncounter
    end

    subgraph "Goal"
        ACPMedicalPolicyGoal
    end

    subgraph "Patient"
        ACPPatient
    end

    subgraph "Practitioner"
        ACPHealthProfessionalPractitioner
    end

    subgraph "PractitionerRole"
        ACPHealthProfessionalPractitionerRole
    end

    subgraph "Procedure"
        ACPProcedure
    end

    subgraph "RelatedPerson"
        ACPContactPerson
    end

    subgraph "Observation"
        ACPOrganDonationChoiceRegistration
        ACPPositionRegardingEuthanasia
        ACPPreferredPlaceOfDeath
        ACPSenseOfPurpose
        ACPSpecificCareWishes
    end

    %% ---- Style Assignments ----
    class ACPInformRelativesRequest C2
    class ACPAdvanceDirective C0
    class ACPTreatmentDirective C0
    class ACPMedicalDeviceProductICD C2
    class ACPMedicalDevice C2
    class ACPEncounter C3
    class ACPMedicalPolicyGoal C0
    class ACPSpecificCareWishes C0
    class ACPPreferredPlaceOfDeath C0
    class ACPPositionRegardingEuthanasia C0
    class ACPOrganDonationChoiceRegistration C0
    class ACPSenseOfPurpose C0
    class ACPPatient C1
    class ACPHealthProfessionalPractitioner C1
    class ACPHealthProfessionalPractitionerRole C1
    class ACPProcedure C3
    class ACPContactPerson C1

    %% ---- Resource Type References ----
    CommunicationRequest -- "encounter" --> Encounter
    CommunicationRequest -- "sender, subject" --> Patient
    CommunicationRequest -- "requester" --> PractitionerRole
    CommunicationRequest -- "recipient" --> RelatedPerson
    Consent -- "patient, provision.actor" --> Patient
    Consent -- "provision.actor" --> PractitionerRole
    Consent -- "provision.actor" --> RelatedPerson
    DeviceUseStatement -- "device" --> Device
    DeviceUseStatement -- "subject" --> Patient
    DeviceUseStatement -- "extension" --> PractitionerRole
    Encounter -- "subject" --> Patient
    Encounter -- "participant" --> PractitionerRole
    Encounter -- "reasonReference" --> Procedure
    Encounter -- "participant" --> RelatedPerson
    Goal -- "subject" --> Patient
    Observation -- "encounter" --> Encounter
    Observation -- "subject" --> Patient
    Observation -- "performer" --> PractitionerRole
    Patient -- "contact.extension" --> RelatedPerson
    PractitionerRole -- "practitioner" --> Practitioner
    Procedure -- "encounter" --> Encounter
    Procedure -- "performer, subject" --> Patient
    Procedure -- "performer" --> PractitionerRole
    Procedure -- "performer" --> RelatedPerson
    RelatedPerson -- "patient" --> Patient
```

### data-exchange.html (#2) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/main/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br />(Client)
    participant S as ACP Actor Provider<br />(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
  
        par 
            %% 1. Procedures
            C->>S: GET /Procedure?patient=Patient/[id]<br />&code=sct|713603004<br />&_include=Procedure:encounter
            activate S
            S-->>C: 200 OK: Bundle (Procedure + Encounter)
            deactivate S
        and
            %% 2. Consent (TreatmentDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|treatment<br />&category=http://snomed.info/sct|129125009<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 3. Consent (AdvanceCareDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|adr<br />&category=http://terminology.hl7.org/CodeSystem/consentcategorycodes|acd<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 4. Goals
            C->>S: GET /Goal?patient=Patient/[id]<br />&category=http://snomed.info/sct|713603004
            activate S
            S-->>C: 200 OK: Bundle (Goal)
            deactivate S
        and
            %% 5. Observations
            C->>S: GET /Observation?patient=Patient/[id]<br />&code=http://snomed.info/sct|153851000146100,395091006,340171000146104,247751003
            activate S
            S-->>C: 200 OK: Bundle (Observation)
            deactivate S
        and
            %% 6. Devices
            C->>S: GET /DeviceUseStatement?patient=Patient/[id]<br />&device.type=http://snomed.info/sct|72506001,465460004,468542000,704707009,1263462004,1236894001<br />&_include=DeviceUseStatement:device
            activate S
            S-->>C: 200 OK: Bundle (DeviceUseStatement + Device)
            deactivate S
        and
            %% 7. CommunicationRequests
            C->>S: GET /CommunicationRequest?patient=Patient/[id]<br />&category=http://snomed.info/sct|713603004
            activate S
            S-->>C: 200 OK: Bundle (CommunicationRequest)
            deactivate S
        end
    end

    opt Resolve Additional References
        note over C: If resources contain unresolved references<br />(e.g., to Practitioner), Client performs subsequent GETs
        C->>S: GET [Reference URL]
        S-->>C: 200 OK (Referenced Resource)
    end
```

### data-exchange.html (#3) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/main/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br>(Client)
    participant S as ACP Actor Provider<br>(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
        
        C->>S: GET /QuestionnaireResponse?subject=Patient/[id]<br>&questionnaire=https://api.iknl.nl/docs/pzp/r4/Questionnaire/ACP-zib2020
        activate S

        S-->>C: 200 OK: Bundle (QuestionnaireResponse)

        deactivate S
    end
```

## IKNL/PZP-FHIR-R4 @ Changelog

**Package:** `iknl.fhir.r4.pzp#1.0.0-rc1`

**Advance Care Planning (PZP)**

[Build](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/Changelog) · [GitHub](https://github.com/IKNL/PZP-FHIR-R4/tree/Changelog) · [Canonical](https://api.iknl.nl/docs/pzp/r4/ImplementationGuide/iknl.fhir.r4.pzp)

FHIR 4.0.1 · 2026-03-02

### data-model.html (#1) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/Changelog/data-model.html)

```mermaid
flowchart TB

    %% ---- Style Definitions for Categories ----
    classDef C0 fill:#e6f3ff,stroke:#b3d9ff,color:#000
    classDef C1 fill:#e6ffe6,stroke:#b3ffb3,color:#000
    classDef C2 fill:#fff5e6,stroke:#ffddb3,color:#000
    classDef C3 fill:#f0e6ff,stroke:#d9b3ff,color:#000
    classDef C4 fill:#f2f2f2,stroke:#cccccc,color:#000

    %% ---- Subgraph Definitions ----
    subgraph "CommunicationRequest"
        ACPInformRelativesRequest
    end

    subgraph "Consent"
        ACPAdvanceDirective
        ACPTreatmentDirective
    end

    subgraph "Device"
        ACPMedicalDeviceProductICD
    end

    subgraph "DeviceUseStatement"
        ACPMedicalDevice
    end

    subgraph "Encounter"
        ACPEncounter
    end

    subgraph "Goal"
        ACPMedicalPolicyGoal
    end

    subgraph "Patient"
        ACPPatient
    end

    subgraph "Practitioner"
        ACPHealthProfessionalPractitioner
    end

    subgraph "PractitionerRole"
        ACPHealthProfessionalPractitionerRole
    end

    subgraph "Procedure"
        ACPProcedure
    end

    subgraph "RelatedPerson"
        ACPContactPerson
    end

    subgraph "Observation"
        ACPOrganDonationChoiceRegistration
        ACPPositionRegardingEuthanasia
        ACPPreferredPlaceOfDeath
        ACPSenseOfPurpose
        ACPSpecificCareWishes
    end

    %% ---- Style Assignments ----
    class ACPInformRelativesRequest C2
    class ACPAdvanceDirective C0
    class ACPTreatmentDirective C0
    class ACPMedicalDeviceProductICD C2
    class ACPMedicalDevice C2
    class ACPEncounter C3
    class ACPMedicalPolicyGoal C0
    class ACPSpecificCareWishes C0
    class ACPPreferredPlaceOfDeath C0
    class ACPPositionRegardingEuthanasia C0
    class ACPOrganDonationChoiceRegistration C0
    class ACPSenseOfPurpose C0
    class ACPPatient C1
    class ACPHealthProfessionalPractitioner C1
    class ACPHealthProfessionalPractitionerRole C1
    class ACPProcedure C3
    class ACPContactPerson C1

    %% ---- Resource Type References ----
    CommunicationRequest -- "encounter" --> Encounter
    CommunicationRequest -- "sender, subject" --> Patient
    CommunicationRequest -- "requester" --> PractitionerRole
    CommunicationRequest -- "recipient" --> RelatedPerson
    Consent -- "patient, provision.actor" --> Patient
    Consent -- "provision.actor" --> PractitionerRole
    Consent -- "provision.actor" --> RelatedPerson
    DeviceUseStatement -- "device" --> Device
    DeviceUseStatement -- "subject" --> Patient
    Encounter -- "subject" --> Patient
    Encounter -- "participant" --> PractitionerRole
    Encounter -- "reasonReference" --> Procedure
    Encounter -- "participant" --> RelatedPerson
    Goal -- "subject" --> Patient
    Observation -- "encounter" --> Encounter
    Observation -- "subject" --> Patient
    Observation -- "performer" --> PractitionerRole
    Patient -- "contact.extension" --> RelatedPerson
    PractitionerRole -- "practitioner" --> Practitioner
    Procedure -- "encounter" --> Encounter
    Procedure -- "performer, subject" --> Patient
    Procedure -- "performer" --> PractitionerRole
    Procedure -- "performer" --> RelatedPerson
    RelatedPerson -- "patient" --> Patient
```

### data-exchange.html (#2) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/Changelog/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br />(Client)
    participant S as ACP Actor Provider<br />(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
  
        par 
            %% 1. Procedures
            C->>S: GET /Procedure?patient=Patient/[id]<br />&code=sct|713603004<br />&_include=Procedure:encounter
            activate S
            S-->>C: 200 OK: Bundle (Procedure + Encounter)
            deactivate S
        and
            %% 2. Consent (TreatmentDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|treatment<br />&category=http://snomed.info/sct|129125009<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 3. Consent (AdvanceCareDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|adr<br />&category=http://terminology.hl7.org/CodeSystem/consentcategorycodes|acd<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 4. Goals
            C->>S: GET /Goal?patient=Patient/[id]<br />&description=http://snomed.info/sct|385987000,1351964001,713148004
            activate S
            S-->>C: 200 OK: Bundle (Goal)
            deactivate S
        and
            %% 5. Observations
            C->>S: GET /Observation?patient=Patient/[id]<br />&code=http://snomed.info/sct|153851000146100,395091006,340171000146104,247751003
            activate S
            S-->>C: 200 OK: Bundle (Observation)
            deactivate S
        and
            %% 6. Devices
            C->>S: GET /DeviceUseStatement?patient=Patient/[id]<br />&device.type:in=https://api.iknl.nl/docs/pzp/r4/ValueSet/ACP-MedicalDeviceProductType-ICD<br />&_include=DeviceUseStatement:device
            activate S
            S-->>C: 200 OK: Bundle (DeviceUseStatement + Device)
            deactivate S
        and
            %% 7. CommunicationRequests
            C->>S: GET /CommunicationRequest?patient=Patient/[id]<br />&category=http://snomed.info/sct|713603004
            activate S
            S-->>C: 200 OK: Bundle (CommunicationRequest)
            deactivate S
        end
    end

    opt Resolve Additional References
        note over C: If resources contain unresolved references<br />(e.g., to Practitioner), Client performs subsequent GETs
        C->>S: GET [Reference URL]
        S-->>C: 200 OK (Referenced Resource)
    end
```

### data-exchange.html (#3) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/Changelog/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br>(Client)
    participant S as ACP Actor Provider<br>(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
        
        C->>S: GET /QuestionnaireResponse?subject=Patient/[id]<br>&questionnaire=https://api.iknl.nl/docs/pzp/r4/Questionnaire/ACP-zib2020
        activate S

        S-->>C: 200 OK: Bundle (QuestionnaireResponse)

        deactivate S
    end
```

## IKNL/PZP-FHIR-R4 @ QA

**Package:** `iknl.fhir.r4.pzp#1.0.0-rc1`

**Advance Care Planning (PZP)**

[Build](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/QA) · [GitHub](https://github.com/IKNL/PZP-FHIR-R4/tree/QA) · [Canonical](https://api.iknl.nl/docs/pzp/r4/ImplementationGuide/iknl.fhir.r4.pzp)

FHIR 4.0.1 · 2026-02-27

### data-model.html (#1) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/QA/data-model.html)

```mermaid
flowchart TB

    %% ---- Style Definitions for Categories ----
    classDef C0 fill:#e6f3ff,stroke:#b3d9ff,color:#000
    classDef C1 fill:#e6ffe6,stroke:#b3ffb3,color:#000
    classDef C2 fill:#fff5e6,stroke:#ffddb3,color:#000
    classDef C3 fill:#f0e6ff,stroke:#d9b3ff,color:#000
    classDef C4 fill:#f2f2f2,stroke:#cccccc,color:#000

    %% ---- Subgraph Definitions ----
    subgraph "CommunicationRequest"
        ACPInformRelativesRequest
    end

    subgraph "Consent"
        ACPAdvanceDirective
        ACPTreatmentDirective
    end

    subgraph "Device"
        ACPMedicalDeviceProductICD
    end

    subgraph "DeviceUseStatement"
        ACPMedicalDevice
    end

    subgraph "Encounter"
        ACPEncounter
    end

    subgraph "Goal"
        ACPMedicalPolicyGoal
    end

    subgraph "Patient"
        ACPPatient
    end

    subgraph "Practitioner"
        ACPHealthProfessionalPractitioner
    end

    subgraph "PractitionerRole"
        ACPHealthProfessionalPractitionerRole
    end

    subgraph "Procedure"
        ACPProcedure
    end

    subgraph "RelatedPerson"
        ACPContactPerson
    end

    subgraph "Observation"
        ACPOrganDonationChoiceRegistration
        ACPPositionRegardingEuthanasia
        ACPPreferredPlaceOfDeath
        ACPSenseOfPurpose
        ACPSpecificCareWishes
    end

    %% ---- Style Assignments ----
    class ACPInformRelativesRequest C2
    class ACPAdvanceDirective C0
    class ACPTreatmentDirective C0
    class ACPMedicalDeviceProductICD C2
    class ACPMedicalDevice C2
    class ACPEncounter C3
    class ACPMedicalPolicyGoal C0
    class ACPSpecificCareWishes C0
    class ACPPreferredPlaceOfDeath C0
    class ACPPositionRegardingEuthanasia C0
    class ACPOrganDonationChoiceRegistration C0
    class ACPSenseOfPurpose C0
    class ACPPatient C1
    class ACPHealthProfessionalPractitioner C1
    class ACPHealthProfessionalPractitionerRole C1
    class ACPProcedure C3
    class ACPContactPerson C1

    %% ---- Resource Type References ----
    CommunicationRequest -- "encounter" --> Encounter
    CommunicationRequest -- "sender, subject" --> Patient
    CommunicationRequest -- "requester" --> PractitionerRole
    CommunicationRequest -- "recipient" --> RelatedPerson
    Consent -- "patient, provision.actor" --> Patient
    Consent -- "provision.actor" --> PractitionerRole
    Consent -- "provision.actor" --> RelatedPerson
    DeviceUseStatement -- "device" --> Device
    DeviceUseStatement -- "subject" --> Patient
    Encounter -- "subject" --> Patient
    Encounter -- "participant" --> PractitionerRole
    Encounter -- "reasonReference" --> Procedure
    Encounter -- "participant" --> RelatedPerson
    Goal -- "subject" --> Patient
    Observation -- "encounter" --> Encounter
    Observation -- "subject" --> Patient
    Observation -- "performer" --> PractitionerRole
    Patient -- "contact.extension" --> RelatedPerson
    PractitionerRole -- "practitioner" --> Practitioner
    Procedure -- "encounter" --> Encounter
    Procedure -- "performer, subject" --> Patient
    Procedure -- "performer" --> PractitionerRole
    Procedure -- "performer" --> RelatedPerson
    RelatedPerson -- "patient" --> Patient
```

### data-exchange.html (#2) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/QA/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br />(Client)
    participant S as ACP Actor Provider<br />(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
  
        par 
            %% 1. Procedures
            C->>S: GET /Procedure?patient=Patient/[id]<br />&code=sct|713603004<br />&_include=Procedure:encounter
            activate S
            S-->>C: 200 OK: Bundle (Procedure + Encounter)
            deactivate S
        and
            %% 2. Consent (TreatmentDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|treatment<br />&category=http://snomed.info/sct|129125009<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 3. Consent (AdvanceCareDirective)
            C->>S: GET /Consent?patient=Patient/[id]<br />&scope=http://terminology.hl7.org/CodeSystem/consentscope|adr<br />&category=http://terminology.hl7.org/CodeSystem/consentcategorycodes|acd<br />&_include=Consent:actor
            activate S
            S-->>C: 200 OK: Bundle (Consent + PractitionerRole + RelatedPerson)
            deactivate S
        and
            %% 4. Goals
            C->>S: GET /Goal?patient=Patient/[id]<br />&description=http://snomed.info/sct|385987000,1351964001,713148004
            activate S
            S-->>C: 200 OK: Bundle (Goal)
            deactivate S
        and
            %% 5. Observations
            C->>S: GET /Observation?patient=Patient/[id]<br />&code=http://snomed.info/sct|153851000146100,395091006,340171000146104,247751003
            activate S
            S-->>C: 200 OK: Bundle (Observation)
            deactivate S
        and
            %% 6. Devices
            C->>S: GET /DeviceUseStatement?patient=Patient/[id]<br />&device.type=http://snomed.info/sct|72506001,465460004,468542000,704707009,1263462004,1236894001<br />&_include=DeviceUseStatement:device
            activate S
            S-->>C: 200 OK: Bundle (DeviceUseStatement + Device)
            deactivate S
        and
            %% 7. CommunicationRequests
            C->>S: GET /CommunicationRequest?patient=Patient/[id]<br />&category=http://snomed.info/sct|713603004
            activate S
            S-->>C: 200 OK: Bundle (CommunicationRequest)
            deactivate S
        end
    end

    opt Resolve Additional References
        note over C: If resources contain unresolved references<br />(e.g., to Practitioner), Client performs subsequent GETs
        C->>S: GET [Reference URL]
        S-->>C: 200 OK (Referenced Resource)
    end
```

### data-exchange.html (#3) — [view page](https://build.fhir.org/ig/IKNL/PZP-FHIR-R4/branches/QA/data-exchange.html)

```mermaid
sequenceDiagram
    autonumber
    participant C as ACP Actor Consulter<br>(Client)
    participant S as ACP Actor Provider<br>(Server)

    note over C, S: Prerequisite: client possesses access token & Patient ID

    rect rgb(240, 248, 255)
        
        C->>S: GET /QuestionnaireResponse?subject=Patient/[id]<br>&questionnaire=https://api.iknl.nl/docs/pzp/r4/Questionnaire/ACP-zib2020
        activate S

        S-->>C: 200 OK: Bundle (QuestionnaireResponse)

        deactivate S
    end
```

## jmandel/smart-permission-tickets-wip @ main

**Package:** `smart.permission-tickets#0.1.0`

**SMART Permission Tickets**

[Build](https://build.fhir.org/ig/jmandel/smart-permission-tickets-wip/branches/main) · [GitHub](https://github.com/jmandel/smart-permission-tickets-wip/tree/main) · [Canonical](http://smarthealthit.org/ig/permission-tickets/ImplementationGuide/smart.permission-tickets)

FHIR 4.0.1 · 2026-04-09

### index.html — [view page](https://build.fhir.org/ig/jmandel/smart-permission-tickets-wip/branches/main/index.html)

```mermaid
sequenceDiagram
    participant Trigger as Trigger Event
    participant Issuer as Trusted Issuer
    participant Client as Client App
    participant Server as Data Holder (FHIR)

    Note over Trigger, Client: 1. Context Established
    Trigger->>Issuer: Event (e.g. Referral, Case Report)
    Issuer->>Issuer: Verify Context & Identity
    Issuer->>Client: Mint Permission Ticket (JWT)

    Note over Client, Server: 2. Redemption
    Client->>Client: Generate Client Assertion (JWT)
    Client->>Server: POST /token (token exchange + ticket as subject_token)

    Note over Server: 3. Validation
    Server->>Server: Verify Client Assertion
    Server->>Server: Verify Ticket Signature (Issuer Trust)
    Server->>Server: Enforce Ticket Constraints
    Server-->>Client: Access Token (Down-scoped)

    Note over Client, Server: 4. Access
    Client->>Server: GET /Patient/123/Immunization
    Server-->>Client: FHIR Resources
```

## JohnMoehrke/xacml-consent @ main

**Package:** `johnmoehrke.xacml-consent.example#0.1.0`

**John Moehrke XACML Consent Example**

[Build](https://build.fhir.org/ig/JohnMoehrke/xacml-consent/branches/main) · [GitHub](https://github.com/JohnMoehrke/xacml-consent/tree/main) · [Canonical](http://johnmoehrke.github.io/xacml-consent/ImplementationGuide/johnmoehrke.xacml-consent.example)

FHIR 4.0.1 · 2026-02-11

### generic.html (#1) — [view page](https://build.fhir.org/ig/JohnMoehrke/xacml-consent/branches/main/generic.html)

```mermaid
graph TD
    A[FHIR Consent Resource] -->|policy.uri| B[XACML Overriding Policy]
    A -->|"source[x]"| C[XACML Patient Consent Policy]
    style B fill:#ff0000,color:#fff
    style C fill:#ff0000,color:#fff
```

### ab352.html (#2) — [view page](https://build.fhir.org/ig/JohnMoehrke/xacml-consent/branches/main/ab352.html)

```mermaid
graph TD
    Start((Medical Record Action)) --> Destination{Destination?}

    %% IN-STATE FLOW
    Destination -->|CA Data Exchange| InState[<b>IN-STATE</b>]
    InState --> DxFGate{Specific Consent on File?}
    
    DxFGate -->|No| AutoFilter[<b>AUTO-FILTER: ENABLED</b>]
    AutoFilter -->|Action| Scrub[Scrub Sensitive Codes]
    Scrub --> SharePartial[Share General Data Only]
    
    DxFGate -->|Yes| FilterOff[<b>Follow Consent #40;AUTO-FILTER:disabled#41;</b>]
    FilterOff --> ShareFull[Share Consent Permitted Record via DxF]

    %% OUT-OF-STATE FLOW
    Destination -->|Cross Border| OutState[<b>OUT-OF-STATE</b>]
    OutState --> ShieldGate{Specific Consent on File?}
    
    ShieldGate -->|No| Block[<b>AB 352 SHIELD: BLOCKED</b>]
    Block --> Partial[Release Non-Sensitive Data Only]
    
    ShieldGate -->|Yes| Consented[<b>Follow Consent</b>]
    Consented --> Full[Release Consent Permitted Record]

    %% Formatting
    style AutoFilter fill:#fff4dd,stroke:#d4a017,stroke-width:2px
    style FilterOff fill:#9f9,stroke:#333
    style Block fill:#f99,stroke:#333
```

### ab352.html (#3) — [view page](https://build.fhir.org/ig/JohnMoehrke/xacml-consent/branches/main/ab352.html)

```mermaid
flowchart TD

    A["Request to access/disclose data"] --> B["PEP collects attributes"]
    B --> C["Attributes: action, sensitivity, recipient jurisdiction, purpose"]
    C --> D["PDP evaluates PolicySet urn:org:hospital:policyset:AB352"]

    D --> E1{"Action = disclose?"}
    E1 -- Yes --> F1{"Sensitivity in AB352 set?"}
    F1 -- Yes --> G1{"Recipient jurisdiction != CA?"}
    G1 -- Yes --> H1["Deny<br/>Obligation: log-denial"]
    G1 -- No --> I1["Continue evaluation<br/>(local org policies)"]
    F1 -- No --> I1

    E1 -- No --> E2{"Action = access/use?"}
    E2 -- Yes --> F2{"Recipient jurisdiction = CA<br/>AND purpose = TREATMENT?"}
    F2 -- Yes --> H2["Permit<br/>Obligation: segment-sensitive-data"]
    F2 -- No --> I2["NotApplicable or other org policies"]

    E2 -- No --> I2

    H2 --> J["PEP enforces segmentation<br/>(EHR/HIE data segregation)"]
    H1 --> K["PEP denies disclosure<br/>and records AuditEvent"]
```

### ab352.html (#4) — [view page](https://build.fhir.org/ig/JohnMoehrke/xacml-consent/branches/main/ab352.html)

```mermaid
graph TD
    PS["<b>PolicySet:</b> AB352 Compliance<br/>Target: CA-HOSPITAL<br/>Combining Alg: Deny-Overrides"]
    
    PS --> P1_T
    PS --> P2_T
    PS --> P3_T

    %% Policy 1
    subgraph P1 ["Policy 1: Data Disclosure Control"]
        P1_T["Target: Action = DISCLOSE"]
        P1_R1["Rule: Deny Out-of-State"]
        P1_C{"Condition:<br/>Is Sensitive Health Data?<br/>AND Recipient != CA?"}
        P1_O["Obligation: Log Denial Reason"]
        
        P1_T --> P1_R1
        P1_R1 --> P1_C
        P1_R1 --> P1_O
    end

    %% Policy 2
    subgraph P2 ["Policy 2: In-State Clinical Use"]
        P2_T["Target: Action = ACCESS/USE"]
        P2_R1["Rule: Permit Treatment"]
        P2_C{"Condition:<br/>Recipient = CA?<br/>AND Purpose = TREATMENT?"}
        
        P2_T --> P2_R1
        P2_R1 --> P2_C
    end

    %% Policy 3
    subgraph P3 ["Policy 3: Mandatory Segmentation"]
        P3_T["Target: Any"]
        P3_R1["Rule: Permit"]
        P3_O["Obligation: Trigger Segmentation Engine<br/>for Abortion/Gender Care/Contraception"]
        
        P3_T --> P3_R1
        P3_R1 --> P3_O
    end

    %% Styling
    style PS fill:#f9f,stroke:#333,stroke-width:4px
    style P1_R1 fill:#ff9999,stroke:#c00
    style P2_R1 fill:#99ff99,stroke:#0c0
    style P3_O fill:#bbdaff,stroke:#00f
```

## Minsal-CL/R2BO @ master

**Package:** `hl7.fhir.cl.minsal.r2bo#0.2.0-draft`

**Repositorio de Reportes de Biopsias Oncológicas**

[Build](https://build.fhir.org/ig/Minsal-CL/R2BO/branches/master) · [GitHub](https://github.com/Minsal-CL/R2BO/tree/master) · [Canonical](https://interoperabilidad.minsal.cl/fhir/ig/r2bo/ImplementationGuide/hl7.fhir.cl.minsal.r2bo)

FHIR 4.0.1 · 2026-01-27

### design-consideration.html — [view page](https://build.fhir.org/ig/Minsal-CL/R2BO/branches/master/design-consideration.html)

```mermaid
classDiagram
    class ApDiagnosticReport
    class ApComposition 
    ApDiagnosticReport --> ApComposition: extension[composition]
    ApComposition --> ApDiagnosticReport: extension[diagnosticReport-reference]
```

## nuts-foundation/nl-generic-functions-ig @ dezi-proof-version

**Package:** `fhir.nl.gf#0.3.0`

**Netherlands - Generic Functions for data exchange Implementation Guide**

[Build](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/dezi-proof-version) · [GitHub](https://github.com/nuts-foundation/nl-generic-functions-ig/tree/dezi-proof-version) · [Canonical](http://nuts-foundation.github.io/nl-generic-functions-ig/ImplementationGuide/fhir.nl.gf)

FHIR 4.0.1 · 2026-03-12

### credential-DeziIDTokenCredential.html — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/dezi-proof-version/credential-DeziIDTokenCredential.html)

```mermaid
graph TD
    VC[DeziIDTokenCredential]
    VC -->|credentialSubject| HP[HealthcareProvider]
    HP -->|id| DID["did:web:za1.example"]
    HP -->|identifier| URA["87654321 (URA)"]
    HP -->|name| NAME["Zorgaanbieder"]
    HP -->|employs| HW[HealthcareWorker]
    HW -->|identifier| UZI["900000009 (UZI/Dezi-nummer)"]
    HW -->|initials| INIT["B.B."]
    HW -->|surnamePrefix| PRE["van der"]
    HW -->|surname| SUR["Jansen"]
    HW -->|roles| ROLES["01.041, ... (RoleCodeNL)"]
```

## nuts-foundation/nl-generic-functions-ig @ care-services-soft-delete

**Package:** `fhir.nl.gf#0.3.0`

**Netherlands - Generic Functions for data exchange Implementation Guide**

[Build](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/care-services-soft-delete) · [GitHub](https://github.com/nuts-foundation/nl-generic-functions-ig/tree/care-services-soft-delete) · [Canonical](http://nuts-foundation.github.io/nl-generic-functions-ig/ImplementationGuide/fhir.nl.gf)

FHIR 4.0.1 · 2026-03-03

### credential-DeziIDTokenCredential.html — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/care-services-soft-delete/credential-DeziIDTokenCredential.html)

```mermaid
graph TD
    VC[DeziIDTokenCredential]
    VC -->|credentialSubject| HP[HealthcareProvider]
    HP -->|id| DID["did:web:za1.example"]
    HP -->|identifier| URA["87654321 (URA)"]
    HP -->|name| NAME["Zorgaanbieder"]
    HP -->|employs| HW[HealthcareWorker]
    HW -->|identifier| UZI["900000009 (UZI/Dezi-id)"]
    HW -->|initials| INIT["B.B."]
    HW -->|surnamePrefix| PRE["van der"]
    HW -->|surname| SUR["Jansen"]
    HW -->|roles| ROLES["01.041, ... (RoleCodeNL)"]
```

## nuts-foundation/nl-generic-functions-ig @ main

**Package:** `fhir.nl.gf#0.3.0`

**Netherlands - Generic Functions for data exchange Implementation Guide**

[Build](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/main) · [GitHub](https://github.com/nuts-foundation/nl-generic-functions-ig/tree/main) · [Canonical](http://nuts-foundation.github.io/nl-generic-functions-ig/ImplementationGuide/fhir.nl.gf)

FHIR 4.0.1 · 2026-04-08

### credential-DeziUserCredential.html — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/main/credential-DeziUserCredential.html)

```mermaid
graph TD
    VC[DeziUserCredential]
    VC -->|credentialSubject| HP[HealthcareProvider]
    HP -->|id| DID["did:web:za1.example"]
    HP -->|identifier| URA["87654321 (URA)"]
    HP -->|name| NAME["Zorgaanbieder"]
    HP -->|employs| HW[HealthcareWorker]
    HW -->|identifier| UZI["900000009 (UZI/Dezi-nummer)"]
    HW -->|initials| INIT["B.B."]
    HW -->|surnamePrefix| PRE["van der"]
    HW -->|surname| SUR["Jansen"]
    HW -->|role| ROLE["01.041"]
    HW -->|role_name| ROLENAME["Revalidatiearts"]
    HW -->|role_registry| ROLEREG["http://www.dezi.nl/rol_bron/big"]
```

## nuts-foundation/nl-generic-functions-ig @ add-patient-enrollment-credential

**Package:** `fhir.nl.gf#0.3.0`

**Netherlands - Generic Functions for data exchange Implementation Guide**

[Build](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/add-patient-enrollment-credential) · [GitHub](https://github.com/nuts-foundation/nl-generic-functions-ig/tree/add-patient-enrollment-credential) · [Canonical](http://nuts-foundation.github.io/nl-generic-functions-ig/ImplementationGuide/fhir.nl.gf)

FHIR 4.0.1 · 2026-04-08

### credential-DeziUserCredential.html (#1) — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/add-patient-enrollment-credential/credential-DeziUserCredential.html)

```mermaid
graph TD
    VC[DeziUserCredential]
    VC -->|credentialSubject| HP[HealthcareProvider]
    HP -->|id| DID["did:web:za1.example"]
    HP -->|identifier| URA["87654321 (URA)"]
    HP -->|name| NAME["Zorgaanbieder"]
    HP -->|employs| HW[HealthcareWorker]
    HW -->|identifier| UZI["900000009 (UZI/Dezi-nummer)"]
    HW -->|initials| INIT["B.B."]
    HW -->|surnamePrefix| PRE["van der"]
    HW -->|surname| SUR["Jansen"]
    HW -->|role| ROLE["01.041"]
    HW -->|role_name| ROLENAME["Revalidatiearts"]
    HW -->|role_registry| ROLEREG["http://www.dezi.nl/rol_bron/big"]
```

### credential-PatientEnrollmentCredential.html (#2) — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/add-patient-enrollment-credential/credential-PatientEnrollmentCredential.html)

```mermaid
graph TD
    VC[PatientEnrollmentCredential]
    VC -->|issuer| ISSUER["did:x509 (UZI Z- or N-pas)"]
    VC -->|credentialSubject| HP["HealthcareProvider"]
    HP -->|id| HPID["did:web:huisarts-delinden.nl"]
    HP -->|hasEnrollment| PE["PatientEnrollment"]
    PE -->|patient| PAT["Patient"]
    PAT -->|identifier| PATID["Identifier"]
    PATID -->|system| PATSYS["http://fhir.nl/fhir/NamingSystem/bsn"]
    PATID -->|value| PATVAL["999911234 (BSN)"]
    PE -->|enrolledBy| HW["HealthcareWorker"]
    HW -->|identifier| HWID["Identifier"]
    HWID -->|system| HWSYS["http://fhir.nl/fhir/NamingSystem/uzi-nr-pers"]
    HWID -->|value| HWVAL["90001234 (UZI-nr-pers)"]
```

## nuts-foundation/nl-generic-functions-ig @ add-healthcare-professional-delegation-credential

**Package:** `fhir.nl.gf#0.3.0`

**Netherlands - Generic Functions for data exchange Implementation Guide**

[Build](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/add-healthcare-professional-delegation-credential) · [GitHub](https://github.com/nuts-foundation/nl-generic-functions-ig/tree/add-healthcare-professional-delegation-credential) · [Canonical](http://nuts-foundation.github.io/nl-generic-functions-ig/ImplementationGuide/fhir.nl.gf)

FHIR 4.0.1 · 2026-04-08

### credential-DeziUserCredential.html (#1) — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/add-healthcare-professional-delegation-credential/credential-DeziUserCredential.html)

```mermaid
graph TD
    VC[DeziUserCredential]
    VC -->|credentialSubject| HP[HealthcareProvider]
    HP -->|id| DID["did:web:za1.example"]
    HP -->|identifier| URA["87654321 (URA)"]
    HP -->|name| NAME["Zorgaanbieder"]
    HP -->|employs| HW[HealthcareWorker]
    HW -->|identifier| UZI["900000009 (UZI/Dezi-nummer)"]
    HW -->|initials| INIT["B.B."]
    HW -->|surnamePrefix| PRE["van der"]
    HW -->|surname| SUR["Jansen"]
    HW -->|role| ROLE["01.041"]
    HW -->|role_name| ROLENAME["Revalidatiearts"]
    HW -->|role_registry| ROLEREG["http://www.dezi.nl/rol_bron/big"]
```

### credential-HealthcareProfessionalDelegationCredential.html (#2) — [view page](https://build.fhir.org/ig/nuts-foundation/nl-generic-functions-ig/branches/add-healthcare-professional-delegation-credential/credential-HealthcareProfessionalDelegationCredential.html)

```mermaid
graph TD
    VC[HealthcareProfessionalDelegationCredential]
    VC -->|issuer| ISSUER["did:x509 (UZI Z-pas)"]
    VC -->|credentialSubject| HP["HealthcareProvider"]
    HP -->|id| HPID["did:web:huisarts-delinden.nl"]
    HP -->|hasDelegation| DEL["Delegation"]
    DEL -->|delegatedBy| HCP["HealthcareProfessional"]
    HCP -->|identifier| HCPID["Identifier"]
    HCPID -->|system| HCPSYS["http://fhir.nl/fhir/NamingSystem/uzi-nr-pers"]
    HCPID -->|value| HCPVAL["90001234 (UZI-nr-pers)"]
    HCP -->|roleCode| HCPROLE["01.015 (UZI rolcode)"]
    DEL -->|scope| SCOPE["DelegationScope"]
    SCOPE -->|authorizationRule| RULE["http://gis-nl.example/authorizationRule/example"]
    SCOPE -->|authorizedActions| ACTIONS["[read, write]"]
```

## nw-gmsa/nw-gmsa.github.com @ main

**Package:** `fhir.nwgenomics.nhs.uk#0.2.2`

**NHS North West Genomics**

[Build](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main) · [GitHub](https://github.com/nw-gmsa/nw-gmsa.github.com/tree/main) · [Canonical](https://fhir.nwgenomics.nhs.uk/ImplementationGuide/fhir.nwgenomics.nhs.uk)

FHIR 4.0.1 · 2026-04-10

### index.html (#1) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/index.html)

```mermaid
sequenceDiagram
    participant clinician as Order Placer<br/>Clinician (EHR)
    participant nurse as Specimen Collection<br/>Clinician/Nurse
    participant LIMS as Order Filler<br/>LIMS 

    clinician ->> clinician: Creates Order
    clinician ->> LIMS: Sends Laboratory Order
    clinician ->> nurse: Requests specimen collection
    nurse ->> nurse: Collect Specimen
    nurse ->> LIMS: Ship Specimen
    LIMS ->> LIMS: Perform Test
    LIMS ->> LIMS: Write Report
    LIMS ->> clinician: Sends Laboratory Report
```

### design.html (#2) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR
    OrderPlacer[<b>Order Placer</b><br/>EPR] --> |1. General Order<br/>HL7 v2 ORM_O01| OrderFiller
    OrderFiller[<b>Order Filler</b><br/>LIMS] --> |2. Laboratory Report<br/>HL7 v2 ORU_R01| OrderPlacer  
    
    classDef purple fill:#E1D5E7;
    class OrderPlacer,OrderFiller purple
```

### design.html (#3) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR

    OrderPlacer[<b>Order Placer</b><br/>EPR] --> |1. General Order<br/>HL7 v2 ORM_O01| TIE["Trust Integration Engine (TIE)"]
    TIE --> |2. General Order<br/>HL7 v2 ORM_O01| OrderFiller
    OrderFiller[<b>Order Filler</b><br/>LIMS] --> |3. Laboratory Report<br/>HL7 v2 ORU_R01| TIE
    TIE --> |4. Laboratory Report<br/>HL7 v2 ORU_R01| OrderPlacer 
    
    classDef purple fill:#E1D5E7;
    class OrderPlacer,OrderFiller purple
```

### design.html (#4) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR
    OrderPlacer[<b>Order Placer</b><br/>EPR] --> |1. General Order<br/>IHE LTW LAB-1<br/>HL7 v2.5.1 OML_O21| OrderFiller
    OrderFiller[<b>Order Filler</b><br/>LIMS] --> |2. Laboratory Report<br/>IHE LTW LAB-3<br/>HL7 v2.5.1 ORU_R01| OrderPlacer  
    
    classDef purple fill:#E1D5E7;
    class OrderPlacer,OrderFiller purple
```

### design.html (#5) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR

    OrderPlacer[<b>Order Placer</b><br/>EPR] --> |1. General Order<br/>HL7 v2 ORM_O01| TIE["Trust Integration Engine (TIE)"]
    TIE --> |2. Laboratory Order<br/>IHE LTW LAB-1<br/>HL7 v2.5.1 OML_O21 or FHIR Message O21| RIE
    RIE["Regional Orchestration Engine (RIE)"] --> |3. General Order<br/>HL7 v2 ORM_O01| OrderFiller
    OrderFiller[<b>Order Filler</b><br/>LIMS] --> |4. Laboratory Report<br/>HL7 v2 ORU_R01| RIE
    RIE --> |5. Laboratory Report<br/>IHE LTW LAB-3<br/>HL7 v2.5.1 ORU_R01| TIE
    TIE --> |6. Laboratory Report<br/>HL7 v2 ORU_R01| OrderPlacer
    
    classDef purple fill:#E1D5E7;
    class OrderPlacer,OrderFiller purple
```

### design.html (#6) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR

    OrderPlacerA[<b>Order Placer</b><br/>NHS Trust A]
    OrderPlacerB[<b>Order Placer</b><br/>NHS Trust B]
    OrderPlacerC[<b>Order Placer</b><br/>NHS Trust C]

    LIMSA[<b>Order Filler</b><br>LIMS iGene]
    LIMSB[<b>Order Filler</b><br>LIMS B]
    LIMSC[<b>Order Filler</b><br>LIMS C]
    LIMSD[<b>Order Filler</b><br>LIMS D]

    OrderPlacerA <--> LIMSA
    OrderPlacerA <--> LIMSB
    OrderPlacerA <--> LIMSC
    OrderPlacerA <--> LIMSD

    OrderPlacerB <--> LIMSA
    OrderPlacerB <--> LIMSB
    OrderPlacerB <--> LIMSC
    OrderPlacerB <--> LIMSD

    OrderPlacerC <--> LIMSA
    OrderPlacerC <--> LIMSB
    OrderPlacerC <--> LIMSC
    OrderPlacerC <--> LIMSD
```

### design.html (#7) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR
  
    subgraph NHSTrustA[NHS Trust A]
        NHSA[<b>Order Placer</b><br/>EPR]
      
    end    

    subgraph NHSTrustB[NHS Trust B]
        NHSB[<b>Order Placer</b><br/>EPR] 
        
    end
    subgraph DataContracts[Data Contract]
        TIEA["NHS Trust A Integration Engine (TIE)"]
        TIEB["NHS Trust B Integration Engine (TIE)"]
        RIE["Regional Orchestration Engine (RIE)"]
    end
    NHSA --> |General Order<br/>HL7 ORM_O01| TIEA
    NHSB --> |Laboratory Order<br/>HL7 OML_O21| TIEB 
    TIEA --> |Laboratory Order<br/>HL7 OML_O21<br/>HE LTW LAB-1| RIE
    TIEB --> |Laboratory Order<br/>HL7 OML_O21<br/>HE LTW LAB-1| RIE
 
    NHSB --> RIE
    RIE --> |Laboratory Order<br/>HL7 v2 OML_O21| LIMSA
    RIE --> LIMSB
    RIE --> LIMSC
    RIE --> LIMSD
     
    LIMSA[<b>Order Filler</b><br>LIMS iGene]
    LIMSB[<b>Order Filler</b><br>LIMS Shire]
    LIMSC[<b>Order Filler</b><br>LIMS C]
    LIMSD[<b>Order Filler</b><br>LIMS D]
```

### design.html (#8) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR
    subgraph NHSTrustA[NHS Trust A]
        NHSA[<b>Order Placer</b><br/>EPR]
    end    

    subgraph NHSTrustB[NHS Trust B]
        NHSB[<b>Order Placer</b><br/>EPR] 
    end

    subgraph DataContracts[Data Contract]
        RIE["Regional Orchestration Engine (RIE)"]
        TIEA["NHS Trust A Integration Engine (TIE)"]
        TIEB["NHS Trust B Integration Engine (TIE)"]
  
    end 
    ICSA[NHS ICS A]
    ICSB[NHS ICS B]
    APPA[NW Genomics Application 1]
    APPB[NW Genomics Application 2]

    LIMSA[<b>Order Filler</b><br>LIMS iGene]
    LIMSB[<b>Order Filler</b><br>LIMS Shire]
    LIMSC[<b>Order Filler</b><br>LIMS C]
    LIMSD[<b>Order Filler</b><br>LIMS D]
   
    LIMSA --> |Laboratory Report<br/>HL7 v2 ORU_R01| RIE
    LIMSB --> RIE
    LIMSC --> RIE
    LIMSD --> RIE
    RIE["Regional Orchestration Engine (RIE)"] --> |Laboratory Report<br/>HL7 v2 ORU_R01<br/>IHE LTW LAB-3| TIEA
    RIE --> |Laboratory Report<br/>HL7 v2 ORU_R01<br/>IHE LTW LAB-3| TIEB
    TIEA --> |Laboratory Report<br/>HL7 v2 ORU_R01| NHSA
    TIEB --> |Laboratory Report<br/>HL7 v2 ORU_R01| NHSB
    RIE --> |Document Notification<br/>HL7 MDM_T02<br/>IHE XDS/MHD| ICSA
    RIE --> ICSB
    RIE --> |Laboratory Report<br/>HL7 v2 ORU_R01<br/>IHE LTW LAB-3| APPB
    RIE --> APPA
```

### design.html (#9) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR
    OrderPlacer[<b>Order Placer</b><br/>EPR] --> |1. General Order<br/>HL7 v2 ORM_O01/OML_O21| TIE
    subgraph DataContract[Data Contract]
        TIE["Trust Integration Engine (TIE)"]
        RIE["Regional Orchestration Engine (RIE)"]
    end 
    TIE --> |2. Laboratory Order<br/>HL7 v2.5.1 OML_O21| RIE
    RIE --> |3. General Order<br/>HL7 v2 ORM_O01/OML_O21| OrderFiller
    
    OrderFiller[<b>Order Filler</b><br/>LIMS] --> |4. Laboratory Report<br/>HL7 v2 ORU_R01| RIE
    RIE --> |5. Laboratory Report<br/>HL7 v2.5.1 ORU_R01| TIE 
    TIE --> |6. Laboratory Report<br/>HL7 v2 ORU_R01| OrderPlacer
```

### design.html (#10) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph TD
    subgraph DataContracts[Data Contract]
        CDR["<b>Data Source</b><br/>Genomic Data Repository (GDR)"]
        subgraph DocS[Document Sharing IHE MHD]
                NHSB[<b>Document Consumer</b><br/>NHS GP/Trust/Board/ICS B] 
          APPB[<b>Document Consumer</b><br/>Application 2]
        end
        subgraph DataS[Data Shareing IHE QEDm/IPA]
            NHSA[<b>Data Consumer</b><br/>NHS GP/Trust/Board/ICS A]
            APPA[<b>Data Consumer</b><br/>Application 1]
        end
    end
    subgraph DocN[Document Sharing IHE MHDS]
        NHSE[<b>Document Consumer</b><br/>National Record Locator<br/>Unified Genomic Record] 
    end 
    CDR --> |HL7 FHIR RESTful<br/>IHE QEDm| NHSA
    CDR --> |HL7 FHIR RESTful<br/>IHE MHD| NHSB
    CDR --> |HL7 FHIR RESTful<br/>IHE MHD| NHSE
    CDR --> |HL7 FHIR RESTful<br/>IHE QEDm|APPA
    CDR --> |HL7 FHIR RESTful<br/>IHE MHD| APPB
    
    classDef purple fill:#E1D5E7;
    class CDR,NHSA,NHSB,APPA,APPB,NHSE purple
```

### design.html (#11) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
graph LR
    subgraph OrderPlacerM[Order Placer]
        OrderPlacer[<b>Order Placer</b><br/>EPR]

        DataO["<b>Data Source and Consumer</b>"]
    end 
    subgraph OrderFillerM[Order Filler]
        OrderFiller[<b>Order Filler</b><br/>LIMS] 
        DataF["<b>Data Source and Consumer</b>"]
       
    end 

    OrderPlacer--> |Event Notification - FHIR Task| OrderFiller
    OrderFiller --> |Event Notification - FHIR Task| OrderPlacer  

    DataO --> |HL7 FHIR RESTful<r/>IHE QEDm/MHD/PDQm| DataF
    DataF --> |HL7 FHIR RESTful<r/>IHE QEDm/MHD/PDQm| DataO
    
    classDef purple fill:#E1D5E7;
    class OrderPlacer,OrderFiller,DataO,DataF purple
```

### design.html (#12) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/design.html)

```mermaid
sequenceDiagram
    participant OrderPlacer As Order Placer
    participant DataO as Data Source <br/> Order Placer
    participant OrderFiller As Order Filler
    participant DataF as Data Source <br/> Order Filler

    OrderPlacer ->> DataO: Create Order
    OrderPlacer ->> OrderFiller: DiagnosticRequest - Event Notification (FHIR Task (requested))
    OrderFiller ->> DataO: Retrieve Laboratory Order (FHIR RESTful API Query) 
    alt is accepted
        OrderFiller ->> OrderPlacer: Task Diagnostic Request - Event Notification (FHIR Task (accepted))
        Note over OrderFiller: Starts Testing
         OrderFiller ->> OrderPlacer: Task Diagnostic Request - Event Notification (FHIR Task (in-progress))
        Note over OrderFiller: Interpretation of results and write Report
        OrderFiller ->> DataF: Creates Laboratory Order
        OrderFiller ->> OrderPlacer: Task DiagnosticRequest - Event Notification (FHIR Task (completed))
        OrderPlacer ->> DataF : Retrieve Laboratory Report (FHIR RESTful API Query)
    else is rejected 
        OrderFiller ->> OrderPlacer: Task Diagnostic Request - Event Notification (FHIR Task (rejected))
    end
```

### LTW.html (#13) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/LTW.html)

```mermaid
graph TD;
    OrderPlacer["<b>Order Placer</b><br/>(EPR or Order Comms)"] --> |1. Send Genomic Laboratory Order<br/>HL7 v2 ORM_O01 or OML_O21| OR[Acute Hospitals<br/>Trust Integration Engine]
       OrderPlacer --> |"2. Asks for (Order)"| SpecimenCollection
    SpecimenCollection[Specimen Collection] --> |3. Sends Specimen| OrderFiller
    OR --> |"1a. HL7 FHIR Message O21<br/>(IHE LTW)"| RIE[Middleware<br/>Regional Orchestration Engine] 
    RIE --> |"1c. Send Genomic Laboratory Order<br/>HL7 FHIR Message O21<br/>(IHE LTW)"| CDR[NW Genomics<br/>Clinical Data Repository]
    CDR --> |1d. Send FHIR Event Notification| Any["Any <br/>(future)"]
    RIE --> |"1b. Send Genomic Laboratory Order<br/>HL7 v2 OML_O21<br/>(IHE LTW)"| EHRTIE[NW Genomics<br/>Laboratory Information Management System] 
    RIE --> |"1b. Send Genomic Laboratory Order<br/>FHIR Transaction<br/>via NHS England Genomic Order Management Service"| GOMS["External<br/>Laboratory Information Management System<br/>(Future)"] 
    EHRTIE --> OrderFiller[<b>Order Filler</b>]
    GOMS --> OrderFiller

    classDef green fill:#D5E8D4;
    classDef yellow fill:#FFF2CC;
    class RIE green;
    class OR green;
    class CDR yellow;
```

### LTW.html (#14) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/LTW.html)

```mermaid
graph TD;
    OrderFiller["<b>Order Filler</b><br/>Diagnostic Testing (LIMS)"] --> |"1. Sends HL7 v2 ORU_R01<br/>(IHE LTW)"| RIE[Middleware<br/>NW Genomics<br/>Regional Orchestration Engine] 
    RIE --> |"1a. Sends HL7 v2 ORU_R01<br/>(IHE LTW)"| TIE[Middleware<br/>Acute Hospitals<br/>Trust Integration Engine] 
    TIE--> |"1a. Sends HL7 v2 ORU_R01<br/>(IHE LTW)"| EHRTIE[North West<br/>NHS Trust<br/>EHR] 
    RIE--> |"1a. Sends HL7 v2 ORU_R01<br/>(IHE LTW)"| BOARD["NHS Wales<br/>Health Board<br/> (future?)"]
    RIE --> |"1a. Sends FHIR Transaction<br/>via NHS England Genomic Order Management Service"| GOMS["NHS England<br/>NHS Trust<br/>EHR (Future)"] 
    RIE --> |1b. Sends HL7 v2 MDM_T02 or IHE XDS| ICSTIE[Integrated Care System <br/> Document Repository]
    RIE --> |1c. Sends HL7 FHIR R4<br/>Message O21| CDR[NW Genomics<br/>Clinical Data Repository]
    CDR --> |1d. Sends FHIR Event Notification| Any["Any <br/>(future)"]
    GOMS --> OrderPlacer[<b>Order Placer</b>]
    EHRTIE --> OrderPlacer
    BOARD--> OrderPlacer

    classDef green fill:#D5E8D4;
    classDef yellow fill:#FFF2CC;
    class RIE green;
    class TIE green;
    class CDR yellow;
```

### LTW.html (#15) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/LTW.html)

```mermaid
graph TD;
    subgraph Pathology["Pathology - Greater Manchester ICS"]
        OrderPlacer[Order Placer<br/>e.g. MFT EPIC] --> |"1. Sends Laboratory Order (Pathology)<br/>ORM_O01 or OML_O21"| OrderFiller["Order Filler (Pathology)<br/>e.g. MFT EPIC Beaker or CFT Shire"]
        OrderPlacer --> |"2. Asks for (Orders)"| SpecimenCollection
        SpecimenCollection[Specimen Collection] --> |3. Sends Specimen| OrderFiller
        OrderFiller --> |4. Send Laboratory Report<br/>ORU_R01| OrderPlacer
    end 
    subgraph Genomics["Genomics - North West Region"]
      OrderPlacerG["Order Placer (Pathology)"] --> |5. Send Laboratory Order<br/>OML_O21| OrderFillerG["Order Filler (Genomics)<br/>e.g. iGene"]
      OrderPlacerG --> |6. Sends Specimen| OrderFillerG
      OrderFillerG --> |7. Sends Laboratory Report<br/>ORU_R01| OrderPlacerG
    end

    OrderFiller --> OrderPlacerG
    OrderFiller --> |8. Sends Laboratory Report<br/>ORU_R01| OrderPlacer
```

### ILW.html (#16) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/ILW.html)

```mermaid
sequenceDiagram
    participant OrderPlacer as Requestor<br/>(Order Placer - Laboratory) 
    participant OrderFillerGenomics as Subcontractor<br/>(Order Filler - Genomics Laboratory) 

    OrderPlacer ->> OrderFillerGenomics: Places Laboratory Order (Order Identifier 1. Optional Visit/Spell Number A)
    OrderFillerGenomics -->> OrderPlacer: Returns Laboratory Report (Report Identifier 1 & Order Identifier 1. Optional Visit/Spell Number A)
```

### ILW.html (#17) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/ILW.html)

```mermaid
sequenceDiagram
    participant OrderPlacer as Order Placer
    participant OrderFillerSpecialty as Requestor<br/>(Order Filler - Specialty)  
    participant OrderFillerPathology as Subcontractor<br/>(Order Filler - Pathology Laboratory)
    participant OrderFillerGenomics as Subcontractor<br/>(Order Filler - Genomics Laboratory)
  

    OrderPlacer ->> OrderFillerSpecialty: Places Order (Order Identifier 1 & Visit/Spell Number A)
    alt Pathology Diagnostic Testing
        OrderFillerSpecialty ->> OrderFillerPathology: Places Laboratory Order (Order Identifier 2 & Visit/Spell Number A)
        OrderFillerPathology -->> OrderFillerSpecialty: Returns Laboratory Report (Report Identifier 1, Order Identifier 2 & Visit/Spell Number A)
    end
    alt Genomic Diagnostic Testing
        OrderFillerSpecialty ->> OrderFillerGenomics: Places Laboratory Order (Order Identifier 3 & Visit/Spell Number A)
        OrderFillerGenomics -->> OrderFillerSpecialty: Returns Laboratory Report (Report Identifier 2 , Order Identifier 3 & Visit/Spell Number A)
    end

    OrderFillerSpecialty -->> OrderPlacer: Returns (Discharge/Hospital?) Report (Report Identifier 3, Order Identifier 1 & Visit/Spell Number A)
```

### ILW.html (#18) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/ILW.html)

```mermaid
sequenceDiagram
    participant OrderPlacer as Order Placer

    participant OrderFillerPathology as Requestor<br/>(Order Filler - Pathology Laboratory) 
    participant OrderFillerGenomics as Subcontractor<br/>(Order Filler - Genomics Laboratory)
  
    OrderPlacer ->> OrderFillerPathology: Places Order (Order Identifier 1, Visit/Spell Number A and Specimen Accession Number X)
    OrderFillerPathology -->> OrderPlacer: Returns Report (Report Identifier 1, Order Identifier 1, Visit/Spell Number A  and Specimen Accession Number X)
   
    alt Reflex (Genomic) Diagnostic Testing
        OrderFillerPathology ->> OrderFillerGenomics: Places Laboratory Order (Order (Filler) Identifier 2,  Visit/Spell Number A and Specimen Accession Number X)
        OrderFillerGenomics -->> OrderFillerPathology: Returns Laboratory Report (Report Identifier 2, Order Identifier 2, Visit/Spell Number A and Specimen Accession Number X)
    end
    OrderFillerPathology -->> OrderPlacer: Returns Report (Report Identifier 2, Order Identifier 1, Order Identifier 2, Visit/Spell Number A  and Specimen Accession Number X)
```

### ILW.html (#19) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/ILW.html)

```mermaid
sequenceDiagram
    participant OrderPlacer as Order Placer

    participant OrderFillerGenomics1 as Requestor<br/>(Order Filler - Genomic Laboratory 1) 
    participant OrderFillerGenomics2 as Subcontractor<br/>(Order Filler - Genomic Laboratory 2)
  

    OrderPlacer ->> OrderFillerGenomics1: Places Order (Order Identifier 1, Visit/Spell Number A and Specimen Accession Number X)

    alt Sub Contracted Genomic Diagnostic Testing
        OrderFillerGenomics1 ->> OrderFillerGenomics2: Places Laboratory Order (Order Identifier 2, Visit/Spell Number A and Specimen Accession Number X)
        OrderFillerGenomics2 -->> OrderFillerGenomics1: Returns Laboratory Report (Report Identifier 2, Order Identifier 2, Visit/Spell Number A and Specimen Accession Number X)
    end

    OrderFillerGenomics1 -->> OrderPlacer: Returns Report (Report Identifier 1, Order Identifier 1, Visit/Spell Number A  and Specimen Accession Number X)
```

### SET.html (#20) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/SET.html)

```mermaid
graph TD
    Home --> |1. Patient Arrives| DayUnit
    DayUnit --> |2. Performs Patient Admission| EHR
    DayUnit --> |3. Patient Sent to| Biopsy
    Biopsy --> |A. Collects Specimen| Biopsy
    Biopsy --> |4. Patient sent back to| DayUnit
    DayUnit -->  |5. Patient Discharged| Home
    Biopsy --> |B. Sends Specimen| SpecimenReception[Specimen Reception]
    SpecimenReception --> |C. Specimen Administration| LIMS[Diagnostic Testing - LIMS]
```

### SET.html (#21) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/SET.html)

```mermaid
graph TD
    PTC["Primary Treatment Centre (PTC)"] --> |1. Sends Blood Tests Request| POSCU["Paediatric Oncology Shared Care Unit (POSCU)"]
    POSCU --> |2. Blood Collection Task| Collection["Blood Sample Taken<br/><br/>Community Nurse"] 
    Collection --> |3. Send Laboratory Order and Blood Specimen| SpecimenReception[Specimen Reception]
    SpecimenReception --> |4. Send Laboratory Order and Blood Specimen| LIMS[Diagnostic Testing - LIMS]
    LIMS --> |5. Performs Blood Test| LIMS
    LIMS --> |6. Write Laboratory Report| LIMS
    LIMS --> |7. Send Laboratory Report| POSCU
    LIMS --> |8. Send Laboratory Report| PTC
    PTC --> Prescription{Prescription Change Required?}
    Prescription --> |9. Yes| Medication[Amend Prescription]
    Medication --> |10. Inform of prescription change| POSCU
```

### HIE.html (#22) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/HIE.html)

```mermaid
graph TD;
    Read[Consumer]-->O
    O{options} --> |"Read Genomic Laboratory Report Data <br/>FHIR REST (US Core) or bespoke API"| EHR[NHS Trust<br/>EHR] 
    O --> |"Read Genomic Laboratory Report Document<br/>FHIR REST (CareConnectAPI)<br/>or IHE XDS"| ICS[Integrated Care System <br/> Document Repository]
    O --> |"Read Genomic Laboratory Report Data <br/>FHIR REST<br/>(IHE QEDm and MHD)"| CDR[Regional Genomic<br/> Clinical Data Repository]
    
    classDef yellow fill:#FFF2CC;
    class CDR yellow;
```

### HIE.html (#23) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/HIE.html)

```mermaid
graph TD;
    Read[Consumer]--> |Read Genomic Laboratory Order| O
    O{options} --> |"FHIR REST<br/>(IHE QEDm and MHD)"| CDR[Regional Genomic<br/> Clinical Data Repository]
    O --> |"FHIR REST (US Core) or bespoke API"| EHR[NHS Trust EPR<br/>EHR] 
    classDef yellow fill:#FFF2CC;
    class CDR yellow;
```

### HIE.html (#24) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/HIE.html)

```mermaid
graph TD;

    LIMS[Genomics<br/>LIMS] --> |" HL7 v2 ORU_R01<br/>(IHE LTW)"| RIE[Middleware<br/>Regional Orchestration Engine];
    RIE --> |"Sends HL7 FHIR R4<br/>Message R01"| CDR[NW Genomics<br/>Clinical Data Repository]
    CDR --> |Publish Report Event| SUB[FHIR Subscription<br/>Event-Notifications]
    SUB --> |Deliver Report Event| EPR["Recipient<br/>e.g. GP Foundation System"]
    EPR --> |Get Report| CDR
   
    classDef yellow fill:#FFF2CC;
    classDef green fill:#D5E8D4;
    classDef blue fill:#DAE8FC;

    class RIE green;
    class EPR green;
    class CDR yellow;
    class SUB blue;
```

### mCSD.html (#25) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/mCSD.html)

```mermaid
graph TD;

    U[Query Client] --> |ITI-90<br/>FHIR REST| RIE["Mobile Care Services Discovery (mCSD)"];
    RIE --> |"Organisation Data Terminology<br/>FHIR REST"| ODS["Organisation Data Service (ODS)"]
    RIE --> |"Future?"| SDS[Spine Directory Service]
    RIE --> |Future?| DOS[Directory of Service]
```

### api-security.html (#26) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/api-security.html)

```mermaid
graph LR

consumer((Data Consumer))

subgraph APIGateway[API Gateway]
    enc[Encryption]
    rate[Rate Limiting]
    id[Identification and Authentication] 
end

subgraph DataPlatform[Data Platform]
    auth[Access Control and Authorisation]
    audit1[Audit Logging]
    consent[Patient Consent]
    data[Data Security]
    api[(Genomic Data Repository<br/>FHIR Repository)]
end

consumer --> |request| APIGateway
enc --> rate
rate --> id

APIGateway --> DataPlatform

audit1 --> auth
auth -->  data
data --> consent 
consent --> api
```

### api-security.html (#27) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/api-security.html)

```mermaid
sequenceDiagram

participant consumer as Data Consumer
participant enc as Encryption
participant rate as Rate Limiting
participant id as Identification and Authentication 
participant auth as Access Control and Authorisation
participant audit1 as Audit Logging
participant api as FHIR Repository


consumer ->> enc: Request
enc ->> rate: Request
alt Ok
    rate ->> id: Request <br/> (authentication is a separate process)
    alt Ok 
       id ->> auth: Request 
       alt Ok
            auth ->> audit1: Request
            audit1 ->> api: Request
            api -->> audit1: Response
            audit1 -->> consumer: Response
       else Issue 
        auth -->> consumer : 403 Forbidden error
       end 
    else Issue
       id -->> consumer : 401 Unauthorized error
    end 
else Issue
    rate -->> consumer: 503 Service Unavailable error 
end
```

### api-security.html (#28) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/api-security.html)

```mermaid
graph TD;

creator[Audit Creator]
repository[(Audit repository)]
consumer[Audit Consumer]

creator --> |"Record Audit Event [ITI-20]"| repository
consumer --> |"Retrieve ATNA Audit Event [ITI-81]"| repository
```

### api-security.html (#29) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/api-security.html)

```mermaid
graph LR

consumer((Document Consumer))

registry["Document Registry<br/>National Record Locator (NRL)"]


SSP["Spine Security Proxy (SSP)"]

subgraph Platform 
subgraph APIGateway[API Gateway]
  PKI[Validation of PKI credentials]
end
subgraph DataPlatform[Data Platform]
    auth[Access Control and Authorisation]
    audit1[Audit Logging]
    data[Data Security]
    api[(Genomic Data Repository)]
end
end 

consumer --> |Find Patient Patient Documents| registry
consumer --> |Retrieve Document| SSP

SSP --> APIGateway
APIGateway --> DataPlatform

auth --> audit1
audit1 --> data 
data --> api
```

### exchange.html (#30) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/exchange.html)

```mermaid
graph TD

EPR[EPR / Order Placer]
TIE["Trust Integration Engine (TIE)"]

subgraph HIE["Health Information Exchange (HIE)"]
    RIE["Regional Orchestration Engine (RIE)"]
    GDR["Genomic Data Repository (GDR)"]
   APIG["API Gateway (APIG)"]
end

subgraph APIM[API Gateway to NHS England APIM]
    PDS["Personnel Demographic Service (PDS)"]
    ODS["Organisation Terminology Service (ODS)"]
    NRL["Nationa Record Locator Service (NRL)"]
end 

LIMS[LIMS / Order Filler]
DC["Data and Document Consumer"]


EPR --> |Document Messaging| TIE
TIE --> RIE
RIE --> |Document Messaging| LIMS
RIE --> |"RESTful API (GET/PUT/POST/DELETE)"| GDR
RIE --> |Event Messaging| EPR
EPR --> |"RESTful API (GET)"| APIG
DC --> |"RESTful API (GET)"| APIG
APIG --> |"RESTful API (GET)"| GDR
RIE --> |RESTful API| APIM

classDef purple fill:#E1D5E7;
class EPR,TIE,LIMS,DC purple
```

### exchange.html (#31) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/exchange.html)

```mermaid
graph LR;

subgraph Producer;
    s[Data Source]
    s --> v2E

    v2E["HL7 v2 Event Message"]
    s --> fEvent["FHIR Message (Event) and Subscription"]
end 

subgraph Consumer
    B[Business Logic]
    d[Data Consumer]
    B --> d
end 

v2E --> B
fEvent --> B


classDef pink fill:#F8CECC
classDef green fill:#D5E8D4;


class restC,v2E,fEvent,Agg green
```

### exchange.html (#32) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/exchange.html)

```mermaid
graph LR;

subgraph Producer;
    s[Data Source]
    v2D["HL7 v2 Document Message"]
    s --> v2D
    s --> fMessage["FHIR Message (Document)"]
 
end 

subgraph Consumer
    B[Business Logic]
    d[Data Consumer]
    B --> d
end 

v2D --> B
fMessage --> B


classDef yellow fill:#FFF2CC;

class v2D,fMessage yellow
```

### exchange.html (#33) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/exchange.html)

```mermaid
graph LR;

subgraph Producer;
    s[Data Source]
     s --> rest["FHIR RESTful (PUT/POST) and Transaction"]
    rB[Business Logic]

    rest --> rB
 
end 

subgraph Consumer

    d[Data Consumer]
end 

rB --> d

classDef pink fill:#F8CECC

class rest,rB pink
```

### exchange.html (#34) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/exchange.html)

```mermaid
graph LR;

subgraph Consumer

    d[Data Consumer]
    d --> restC["FHIR RESTful (GET)"]

end 
subgraph Source;
    s[Data Source]
end 

restC --> s

classDef green fill:#D5E8D4;

class restC,v2E,fEvent,Agg green
```

### exchange.html (#35) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/exchange.html)

```mermaid
graph LR;

subgraph Consumer

    d[Data Consumer]
    d --> restC["FHIR RESTful (GET)"]

end
subgraph Source;
s[Data Source]
Agg["FHIR Document<br/>(Aggregation Layer)"]
Agg --> s
end

restC --> Agg

classDef green fill:#D5E8D4;

class restC,v2E,fEvent,Agg green
```

### data-intro.html (#36) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/data-intro.html)

```mermaid
---
title: Archetype, Entities and Events
---
erDiagram 
    Archetype ||--|{ Entity : hasMany
    Archetype }|--|| Event : hasMany
    Event ||--|| Entity : oftenOne2One
```

### data-intro.html (#37) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/data-intro.html)

```mermaid
graph TD
    EHR[EPR] <--> |HL7 v2<br/>Orders & Reports| RIE
    LIMS[LIMS] <--> |HL7 v2<br/>Orders & Reports| RIE

    subgraph HIE["Health Information Exchange"]
        RIE[Regional Orchestration Engine] --> |Store<br/>HL7 FHIR| CDR[Genomic Data Repository]
    end
    Clinician[Data Sharing<br/>Clinical Apps<br/>Single Patient Record] --> |Read<br/>HL7 FHIR| CDR
    AI[Operational AI] --> |Read<br/>HL7 FHIR| CDR
    Ops["Operations Monitoring (Real Time Analytics)"] --> |Read<br/>HL7 FHIR| CDR

    CDR --> OLAP[Data Warehouse]
    A[Analytics and AI] --> OLAP
    OLAP --> FDP[Federated Data Platform]
    A --> FDP

    classDef green fill:#D5E8D4;

    class FDP,OLAP,CDR,LIMS,EHR green
```

### data-intro.html (#38) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/data-intro.html)

```mermaid
flowchart TD
    A[Data Consumer<br/>Identifies Issue or New Constraint]
    B[Log Requirement / Issue<br/>NH Genomics IG Issues]
    C[NW Genomics Data Team<br/>Review & Feasibility Assessment]
    D["Create or Update<br/>Data Contract<br/>Implementation Guide (PR)"]
    E[NW Genomics Data Team<br/>Review & Approval]
    F[Release Change]

    A --> B --> C --> D --> E --> F
```

### Questionnaire-GenomicTestReport.html (#39) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/Questionnaire-GenomicTestReport.html)

```mermaid
classDiagram
    class GenomicReport["Genomic Laboratory Report (result)"]
    class Variant
    class GenomicStudy["Genomic Study"]
    class DiagnosticImplication["Diagnostic Implication"]
    class TherapeuticImplication["Therapeutic Implication"]
    class GenomicStudyAnalysis["Genomic Study Analysis"]

    Variant --|> GenomicReport 
    GenomicStudy --|> GenomicReport
    GenomicStudyAnalysis --|> GenomicReport
    DiagnosticImplication --|> GenomicReport
    TherapeuticImplication ..|> GenomicReport
    Variant <|--|> DiagnosticImplication
    Variant <|..|> TherapeuticImplication
```

### testing.html (#40) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/testing.html)

```mermaid
graph TD;
    subgraph LynchSyndrome[Lynch Syndrome Scenario]
        Nottingham((Nottingham<br/>Lyarra)) --> |Mother| Liverpool[Liverpool<br/>Ned]
        Liverpool --> |Father| Leeds[Leeds<br/>Rob]
        Liverpool --> |Father| Manchester((Manchester<br/>Sansa))
    end

    subgraph CysticFibrosis[Cystic Fibrosis Scenario]
        London((London<br/>Cersei)) --> |Mother| Birmmingham
        London --> |Mother| Wrexham((Wrexham<br/>Myrcella))
        Lancaster[Lancaster<br/>Jaime] --> |Father| Birmmingham[Birmmingham<br/>Tommen]
        Lancaster --> |Father| Wrexham
        London --> |Twin| Lancaster
    end
    
    subgraph TBD[Galactosemia Scenario]
        Warrington((Warrington<br/>Olenna)) --> |Mother| Northwich 
        Northwich[Northwich<br/>Mace] --> |Father| Congleton((Congleton<br/>Margaery))
    end
```

### architecture.html (#41) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/architecture.html)

```mermaid
graph TD
    B[Diagnostic Report Interoperabilty] --> C{"Options <br/>Both answers<br/>are likely"}
    C -->|Event API| D{Existing Interface?}
    C -->|Data Sharing API| E{Document <br/>or Data}
    E --> |Data| Data[Structured]
    E --> |Document<br/>and hybrid| Documents["Unstructured (and Clinical) Documents"]
    Data --> REST["FHIR RESTful API<br/>IHE Query for Existing Data (QEDm)"]
    REST --> UGR[NHS England Unified Genomic Record<br/>NHS England Patient Data Manager]
    Documents --> XDS["FHIR RESTful API<br/>IHE Mobile access to Health Documents (MHD) <br/>or XML SOAP IHE XDS <br/>e.g. NHS England National Record Locator"]
    XDS --> Format{Format}
    Format --> |Binary| Binary[PDF, PMG, html, etc]
    Format --> |Structured - Imaging| RAD[DICOM]
    Format --> |Clinical Document - Laboratory| FHIRDocument["Structured and Unstructured<br/><br/>FHIR Document<br/>e.g. NHS England National Record Locator <br/> e.g. Internation Patient Summary (IPS),<br/>EU Laboratory and Imaging Reports,<br/>XPanDH/EU Hospital Discharge Report (HDR)"]  
    D --> |Yes| V2{Structured or<br/>Unstructured} 
    V2 --> |Structured| LTW[HL7 v2 ORU_R01<br/>IHE Laboratory Testing Workflow LTW LAB-3<br/>and IHE RAD]
    V2 --> |Unstructured| MDM[HL7 v2 MDM_T02 or MDM_T01 <br/> e.g. ICS/LHCRE Systems]
    MDM --> NRL["NHS England National Record Loactor Feed<br/>(POST DocumentReference)<br/>"]
    D --> |No| Workflow[FHIR Workflow <br/> e.g. NHS England Genomic Order Management Service]
    Workflow --> PubSub[FHIR Subscription]
    LTW --> Pathology[FHIR Message <br/> e.g. NHS England Pathology]
    RAD --> NIR[NHS England National Imaging Registry]

    classDef blue fill:#DAE8FC;
    classDef green fill:#D5E8D4;

    class Pathology,UGR,NIR,FHIRDocument,XDS,NRL,Workflow blue
    class LTW,REST,MDM green
```

### business-analysis.html (#42) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph TD;

    A[Assessment]-->|Creates Observations| B;
    A--> |Needs Diagnostic Testing and Completes| T;
    B[Diagnosis]-->|Creates Condition| C;
    T[<b>Order Placer</b><br/>Genomics Test Order]--> |"Sends Laboratory Order<br/>LAB-1 FHIR Message O21"| AN;
    T --> |Asks for| S
    S[Specimen Collection] --> |Sends Specimen| AN;
    AN["<b>Order Filler</b><br/>Diagnostic Testing"] --> |"Requests further tests <br/>(reflex order)"| T;
    AN --> |Sends Laboratory Report<br/>LAB-3 HL7 v2 ORU_R01| A;
    C[Plan]-->|Creates Goals and Tasks| D;
    D[Implement/Interventions]-->|Actions Tasks| E;
    E[Evaluate]--> |Reviews Care| A;
    
    click T Questionnaire-GenomicTestOrder.html
    click AN Questionnaire-GenomicTestReport.html
    click S ExampleScenario-BiopsyProcedure.html

    classDef purple fill:#E1D5E7;

    classDef yellow fill:#FFF2CC;
    classDef pink fill:#F8CECC
    classDef green fill:#D5E8D4;
    classDef blue fill:#DAE8FC;
    classDef orange fill:#FFE6CC;

    class A pink
    class B yellow
    class C green
    class D blue
    class E orange

    class O,S,T,AN purple
```

### business-analysis.html (#43) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph TD;

    subgraph NHSTrust[NHS Trust]
        T[<b>Order Placer</b><br/>EPR]--> |"1a. Sends Laboratory Order<br>LAB-1 HL7v2 ORM_O01/OML_O21"| TIE;
        TIE[Trust Integration Engine] 
        TIE--> |4c. Sends Laboratory Report<br/>LAB-3 HL7 v2 ORU_R01| T;
    end
    TIE --> |"1b. Sends Laboratory Order<br>LAB-1 FHIR Message O21"| RIE;
    T --> |2. Asks for| S
    S[Specimen Collection] --> |3. Sends Specimen| AN;
    subgraph NWGenomics[North West Genomics]
        RIE --> |"1c. Sends Laboratory Order<br>LAB-1 HL7 v2 OML_O21"| AN;
        AN["<b>Order Filler</b><br/>Diagnostic Testing<br/>LIMS iGene"] --> |4a. Sends Laboratory Report<br/>LAB-3 HL7 v2 ORU_R01| RIE;
        RIE[Regional Orchestration Engine] --> |4b. Sends Laboratory Report<br/>LAB-3 HL7 v2 ORU_R01| TIE;
    end 
    click T Questionnaire-GenomicTestOrder.html
    click AN Questionnaire-GenomicTestReport.html
    click S ExampleScenario-BiopsyProcedure.html

    classDef purple fill:#E1D5E7;

    classDef yellow fill:#FFF2CC;
    classDef pink fill:#F8CECC
    classDef green fill:#D5E8D4;
    classDef blue fill:#DAE8FC;
    classDef orange fill:#FFE6CC;

    class A pink
    class B yellow
    class C green
    class D blue
    class E orange

    class O,S,T,AN purple
```

### business-analysis.html (#44) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph TD

    subgraph Trust[NHS Trust]
        EPR[<b>Order Placer</b><br/>EPR]
        TIE[Trust Integration Engine]
    end 
    HODS["<b>Order Filler</b><br/>HODS<br/><b>Order Placer</b>"]
    
    EPR --> |"1. Create Laboratory Order<br/>Manual entry"| HODS
    HODS --> |"2. Send Laboratory Order (Immunology and/or Genomics) + Specimen<br/>"| MFTReception[Specimen Reception]
    MFTReception --> |"3a. (Manual) Immunology Laboratory Order + Specimen"| LIMS["<b>Order Filler</b><br/>Immunology LIMS"]
   
    subgraph Laboratory["Laboratory at NHS Trust"]
        LIMS --> |3b. Send Laboratory Report<br/>HL7 v2 ORU_R01| LIE[Laboratory<br/>Trust Integration Engine]
    end 

    LIE --> |3c. Send Laboratory Report<br/>HL7 v2 ORU_R01| HODS
    RIE --> |4d. Send Laboratory Report<br/>HL7 v2 ORU_R01| HODS
    MFTReception --> |"4a. Genomics Laboratory Order <br/> Specimen most often entered into iGene"| TestType
    
    subgraph NWGenomics[North West Genomics]
        RIE["Regional Orchestration Engine"]
    
        TestType[Test Distribution<br/>By Test Type to a LIMS] --> |4b. Tests A, B, C, etc| GLH
        GLH["<b>Order Filler</b><br/>LIMS Shire/iGene/StarLims"]
        GLH --> |4c. Send Laboratory Report<br/>HL7 v2 ORU_R01| RIE     
    end
    
    HODS --> |5. Write Consolidated Report| HODS
    HODS --> |"6. Send Consolidated Laboratory Report<br/>Email or HL7 ORU_R01"| TIE

    TIE --> |Laboratory Report| EPR 

    classDef purple fill:#E1D5E7;

    class EPR,HODS,GLH,LIMS purple
```

### business-analysis.html (#45) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph LR
    IGene[iGene] --> |"1. (New HL7 v2 OML_O21 feed from iGene)"| RIE[Regional Orchestration Engine] 
    RIE --> |"2. Stores a copies of orders"| CDR[Genomic Data Repository]
    StarLimsMiddleware["StarLims Middleware <br/>(May be RIE)"] --> |"3. Polls for (starlims) orders from CDR (FHIR RESTful)"| CDR
    StarLimsMiddleware --> |"4. Stores starlims order"| StarLims
    StarLimsMiddleware --> |"5. Gets Reports (poll?)"| StarLims
    StarLimsMiddleware --> |"6. Stores report"| CDR
    RIE --> |"7. Gets Reports (poll?)"| CDR
    RIE --> |"8. Distributes Reports (HL7 v2 ORU_R01)"| HODS[HODS etc]

    classDef purple fill:#E1D5E7;
    class OrderPlacer,OrderFiller purple
```

### business-analysis.html (#46) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph TD;
    subgraph NHSTrustA[NHS Trust]
        EPRA[<b>Order Placer</b>] --> |Asks For| SpecimenA[Sample Collection]
        EPRA --> |1a. Laboratory Order| TIE[Trust Integration Engine]
    end
 
    SpecimenA --> |2 Send Specimen| LIMSA


    TIE --> |1b. Laboratory Order<br/>LAB-1| RIE 
    subgraph NWGenomics[NW Genomics]
        RIE --> |1c. Laboratory Order<br/>LAB-1| LIMSA[<b>Order Filler</b><br/>LIMS iGene]
        
        LIMSA --> |1d. Subcontracted Laboratory Order<br/>LAB-35| LIMSB[<b>Order Filler</b><br/>LIMS Starlims]
        LIMSA --> |1d. Subcontracted Laboratory Order<br/>LAB-35| LIMSC[<b>Order Filler</b><br/>LIMS Shire]

        
        LIMSA --> |4a. Laboratory Report| RIE[Regional Orchestration Engine]
        LIMSB --> |4a. Laboratory Report| RIE
        LIMSC --> |4a. Laboratory Report| RIE

    end
    RIE --> |4b. Laboratory Report| TIE
    TIE --> |4c. Laboratory Report| EPRA
    
    classDef purple fill:#E1D5E7;
    class EPRA,SpecimenA,LIMSA,LIMSB,LIMSC purple;
```

### business-analysis.html (#47) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph TD;
    subgraph NHSTrust[NHS Trust]
        Practitioner[fas:fa-user-md Practitioner] --> |1. Selects Order Form| FormManager
        FormManager --> OrderEntry
        Practitioner --> |3. Completes| OrderEntry[Order Form]
        EPR[<b>Order Placer</b><br/>fas:fa-database Electronic Patient Record] --> |2. Pre Populates with existing data| OrderEntry 
        OrderEntry --> |4. Submits Order| EPR

        Practitioner --> |6. Asks for|Sample[Sample Collection]
    end
    EPR --> |5. Sends Laboratory Order<br/>LAB-1 HL7 FHIR Message O21| DiagnosticTesting[<b>Order Filler</b><br/>fas:fa-stethoscope Diagnostic Testing]
    Sample --> DiagnosticTesting
```

### business-analysis.html (#48) — [view page](https://build.fhir.org/ig/nw-gmsa/nw-gmsa.github.com/branches/main/business-analysis.html)

```mermaid
graph TD;
    Sample[Sample Collection] --> EXT
    Order --> EXT
    subgraph OrderFiller[<b>Order Filler</b> North West Genomics]
        EXT[DNA Extraction] --> SEQ[DNA Sequencing]
        SEQ --> AN[Mapping & Analysis]
        AN --> INT[Interpretation]
    end 
    INT --> |Send Laboratory Report<br/>LAB-3 HL7 v2 ORU_R01| Practitioner[<b>Order Placer</b><br/>EPR]
```

## SHIFT-Task-Force/SLS-ValueSets @ new-build

**Package:** `SHIFT-Task-Force.SLS-ValueSets#0.1.0`

**SHIFT SLS ValueSets Implementation Guide**

[Build](https://build.fhir.org/ig/SHIFT-Task-Force/SLS-ValueSets/branches/new-build) · [GitHub](https://github.com/SHIFT-Task-Force/SLS-ValueSets/tree/new-build) · [Canonical](http://SHIFT-Task-Force.github.io/SLS-ValueSets/ImplementationGuide/SHIFT-Task-Force.SLS-ValueSets)

FHIR 4.0.1 · 2026-03-04

### sls.html (#1) — [view page](https://build.fhir.org/ig/SHIFT-Task-Force/SLS-ValueSets/branches/new-build/sls.html)

```mermaid
graph TD
  A[DocumentReference or Bundle] --> B[Code Analysis Engine]
  B --> C{Sensitive Topic Detected?}
  C -->|Yes| D[Apply meta.security Labels]
  C -->|No| E[No Labeling Needed]

  D --> F[Updated Resource with Labels]
  F --> G[Provenance]
  G --> H[Agent: NLP Engine]
  G --> I[Entity: Original Resource]

  F --> J[AuditEvent]
  J --> K[Who/What/When/Where]
```

### ab352.html (#2) — [view page](https://build.fhir.org/ig/SHIFT-Task-Force/SLS-ValueSets/branches/new-build/ab352.html)

```mermaid
graph TD
    Start((Medical Record Action)) --> Destination{Destination?}

    %% IN-STATE FLOW
    Destination -->|CA Data Exchange| InState[<b>IN-STATE</b>]
    InState --> DxFGate{Specific Consent on File?}
    
    DxFGate -->|No| AutoFilter[<b>AUTO-FILTER: ENABLED</b>]
    AutoFilter -->|Action| Scrub[Scrub Sensitive Codes]
    Scrub --> SharePartial[Share General Data Only]
    
    DxFGate -->|Yes| FilterOff[<b>Follow Consent #40;AUTO-FILTER:disabled#41;</b>]
    FilterOff --> ShareFull[Share Consent Permitted Record via DxF]

    %% OUT-OF-STATE FLOW
    Destination -->|Cross Border| OutState[<b>OUT-OF-STATE</b>]
    OutState --> ShieldGate{Specific Consent on File?}
    
    ShieldGate -->|No| Block[<b>AB 352 SHIELD: BLOCKED</b>]
    Block --> Partial[Release Non-Sensitive Data Only]
    
    ShieldGate -->|Yes| Consented[<b>Follow Consent</b>]
    Consented --> Full[Release Consent Permitted Record]

    %% Formatting
    style AutoFilter fill:#fff4dd,stroke:#d4a017,stroke-width:2px
    style FilterOff fill:#9f9,stroke:#333
    style Block fill:#f99,stroke:#333
```

### ab352.html (#3) — [view page](https://build.fhir.org/ig/SHIFT-Task-Force/SLS-ValueSets/branches/new-build/ab352.html)

```mermaid
flowchart TD

    A["Request to access/disclose data"] --> B["PEP collects attributes"]
    B --> C["Attributes: action, sensitivity, recipient jurisdiction, purpose"]
    C --> D["PDP evaluates PolicySet urn:org:hospital:policyset:AB352"]

    D --> E1{"Action = disclose?"}
    E1 -- Yes --> F1{"Sensitivity in AB352 set?"}
    F1 -- Yes --> G1{"Recipient jurisdiction != CA?"}
    G1 -- Yes --> H1["Deny<br/>Obligation: log-denial"]
    G1 -- No --> I1["Continue evaluation<br/>(local org policies)"]
    F1 -- No --> I1

    E1 -- No --> E2{"Action = access/use?"}
    E2 -- Yes --> F2{"Recipient jurisdiction = CA<br/>AND purpose = TREATMENT?"}
    F2 -- Yes --> H2["Permit<br/>Obligation: segment-sensitive-data"]
    F2 -- No --> I2["NotApplicable or other org policies"]

    E2 -- No --> I2

    H2 --> J["PEP enforces segmentation<br/>(EHR/HIE data segregation)"]
    H1 --> K["PEP denies disclosure<br/>and records AuditEvent"]
```

### ab352.html (#4) — [view page](https://build.fhir.org/ig/SHIFT-Task-Force/SLS-ValueSets/branches/new-build/ab352.html)

```mermaid
graph TD
    PS["<b>PolicySet:</b> AB352 Compliance<br/>Target: CA-HOSPITAL<br/>Combining Alg: Deny-Overrides"]
    
    PS --> P1_T
    PS --> P2_T
    PS --> P3_T

    %% Policy 1
    subgraph P1 ["Policy 1: Data Disclosure Control"]
        P1_T["Target: Action = DISCLOSE"]
        P1_R1["Rule: Deny Out-of-State"]
        P1_C{"Condition:<br/>Is Sensitive Health Data?<br/>AND Recipient != CA?"}
        P1_O["Obligation: Log Denial Reason"]
        
        P1_T --> P1_R1
        P1_R1 --> P1_C
        P1_R1 --> P1_O
    end

    %% Policy 2
    subgraph P2 ["Policy 2: In-State Clinical Use"]
        P2_T["Target: Action = ACCESS/USE"]
        P2_R1["Rule: Permit Treatment"]
        P2_C{"Condition:<br/>Recipient = CA?<br/>AND Purpose = TREATMENT?"}
        
        P2_T --> P2_R1
        P2_R1 --> P2_C
    end

    %% Policy 3
    subgraph P3 ["Policy 3: Mandatory Segmentation"]
        P3_T["Target: Any"]
        P3_R1["Rule: Permit"]
        P3_O["Obligation: Trigger Segmentation Engine<br/>for Abortion/Gender Care/Contraception"]
        
        P3_T --> P3_R1
        P3_R1 --> P3_O
    end

    %% Styling
    style PS fill:#f9f,stroke:#333,stroke-width:4px
    style P1_R1 fill:#ff9999,stroke:#c00
    style P2_R1 fill:#99ff99,stroke:#0c0
    style P3_O fill:#bbdaff,stroke:#00f
```

## steveswinsburg/au-fhir-ps @ master

**Package:** `hl7.fhir.au.ps#0.6.0-cibuild`

**AU Patient Summary Implementation Guide**

[Build](https://build.fhir.org/ig/steveswinsburg/au-fhir-ps/branches/master) · [GitHub](https://github.com/steveswinsburg/au-fhir-ps/tree/master) · [Canonical](http://hl7.org.au/fhir/ps/ImplementationGuide/hl7.fhir.au.ps)

FHIR 4.0.1 · 2026-02-10

### uc-interstate.html (#1) — [view page](https://build.fhir.org/ig/steveswinsburg/au-fhir-ps/branches/master/uc-interstate.html)

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  actor Attending GP as Attending GP
  participant Clinic CIS as Clinic CIS
  participant Patient Summary Host as Patient Summary Host
  Attending GP ->> Clinic CIS: Scan QR for Patient Summary access
  Clinic CIS ->> Patient Summary Host: Retrieve Patient Summary
  Attending GP ->> Clinic CIS: View Patient Summary
```

### uc-referral.html (#2) — [view page](https://build.fhir.org/ig/steveswinsburg/au-fhir-ps/branches/master/uc-referral.html)

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  participant GP CIS as GP CIS
  actor Endocrinologist as Endocrinologist
  participant Endocrinologist CIS as Endocrinologist CIS
  Endocrinologist ->> Endocrinologist CIS: Access Referral and embedded Patient Summary
  Endocrinologist CIS ->> GP CIS: Check for updates and retrieve current Patient Summary
  Endocrinologist ->> Endocrinologist CIS: View current Patient Summary
```

## trifork/ch-epr-fhir @ hpd-mapping

**Package:** `ch.fhir.ig.ch-epr-fhir#5.0.0`

**CH EPR FHIR (R4)**

[Build](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping) · [GitHub](https://github.com/trifork/ch-epr-fhir/tree/hpd-mapping) · [Canonical](http://fhir.ch/ig/ch-epr-fhir/ImplementationGuide/ch.fhir.ig.ch-epr-fhir)

FHIR 4.0.1 · 2026-04-13

### iti-mhd.html (#1) — [view page](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping/iti-mhd.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
           'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Query| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C(Document Responder own community)
    B --> D(Document Responders federated communities)
```

### iti-mhd.html (#2) — [view page](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping/iti-mhd.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Retrieve| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C{own community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

### iti-mhd.html (#3) — [view page](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping/iti-mhd.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Source] -->|Update Doc Metadata| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Source)
    B --> C{own Community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

### iti-67.html (#4) — [view page](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping/iti-67.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
           'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Query| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C(Document Responder own community)
    B --> D(Document Responders federated communities)
```

### iti-68.html (#5) — [view page](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping/iti-68.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Consumer] -->|Retrieve| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Consumer)
    B --> C{own community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

### ch-mhd-1.html (#6) — [view page](https://build.fhir.org/ig/trifork/ch-epr-fhir/branches/hpd-mapping/ch-mhd-1.html)

```mermaid
%%{
    init: {
        'theme': 'neutral',
        'themeVariables': {
            'fontSize': '14px'
        }
    }
}%%
flowchart LR
    A[Document Source] -->|Update Doc Metadata| B(Document Responder
    Option Federated Cross Community Access
    Grouped with Document Source)
    B --> C{own Community?}
    C -->|yes| D(Document Responder own community)
    C -->|no| E(Document Responder federated community)
```

## umzhconnect/umzhconnect-ig @ mr_ortho_uc

**Package:** `ch.fhir.ig.ch-umzh-connect#1.0.0-cibuild`

**CH UMZH Connect IG (R4)**

[Build](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/mr_ortho_uc) · [GitHub](https://github.com/umzhconnect/umzhconnect-ig/tree/mr_ortho_uc) · [Canonical](http://fhir.ch/ig/ch-umzh-connect/ImplementationGuide/ch.fhir.ig.ch-umzh-connect)

FHIR 4.0.1 · 2026-02-25

### usecase-referral-orthopedic.html — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/mr_ortho_uc/usecase-referral-orthopedic.html)

```mermaid
sequenceDiagram
    title Referral - Orthopedic Surgery

    participant HospitalP as HospitalP(lacer)
    participant HospitalF as HospitalF(ulfiller)
    activate HospitalP
    HospitalP->>HospitalP: POST ServiceRequest-ReferralOrthopedicSurgery
    HospitalP->>HospitalF: POST Task (basedOn/focus: ServiceRequest-ReferralOrthopedicSurgery)
    activate HospitalF
    HospitalF-->>HospitalP: created
    deactivate HospitalP
    deactivate HospitalF
    
    HospitalF->>HospitalP: GET Resources (Diagnoses, Medications, Reports)
    activate HospitalF
    activate HospitalP
    HospitalP-->>HospitalF: return search results (Bundle)
    deactivate HospitalF
    deactivate HospitalP

    Note over HospitalF: Request additional information<br/>(smoking status) via Questionnaire
    HospitalF->>HospitalF: Update Task<br/>(owner: HospitalP, businessStatus: on-hold,<br/>output: QuestionnaireSmokingStatus)
    activate HospitalF
    HospitalF-->>HospitalP: Notify Task updated
    activate HospitalP
    HospitalP->>HospitalF: GET Task
    HospitalF-->>HospitalP: Return Task
    HospitalP->>HospitalF: GET Questionnaire by canonical
    HospitalF-->>HospitalP: Return QuestionnaireSmokingStatus
    HospitalP-->>HospitalP: Practitioner fills out Questionnaire
    HospitalP->>HospitalF: POST QuestionnaireResponse
    HospitalF-->>HospitalP: created
    HospitalP->>HospitalF: PATCH Task (owner: HospitalF, input: QuestionnaireResponseSmokingStatus)
    HospitalF-->>HospitalP: updated
    deactivate HospitalP
    deactivate HospitalF

    HospitalF->>HospitalF: Update Task<br/>(businessStatus: completed, output: Report)
    activate HospitalF
    HospitalF-->>HospitalP: Notify Task updated
    activate HospitalP
    HospitalP->> HospitalF: GET Task?_id=...&_include=Task:ch-umzhconnectig-task-outputreference
    HospitalF-->>HospitalP: return result (Bundle)
    deactivate HospitalP
    deactivate HospitalF
```

## umzhconnect/umzhconnect-ig @ main

**Package:** `ch.fhir.ig.ch-umzh-connect#1.0.0-cibuild`

**CH UMZH Connect IG (R4)**

[Build](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/main) · [GitHub](https://github.com/umzhconnect/umzhconnect-ig/tree/main) · [Canonical](http://fhir.ch/ig/ch-umzh-connect/ImplementationGuide/ch.fhir.ig.ch-umzh-connect)

FHIR 4.0.1 · 2026-03-23

### core-concepts.html (#1) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/main/core-concepts.html)

```mermaid
sequenceDiagram
    title Process flow between Placer and Fulfiller
    actor Placer
    actor Fulfiller
    activate Placer
    Placer->>Placer: Create Service Request
    deactivate Placer
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Create Task
    activate Fulfiller
    Fulfiller->>Placer: Task Response
    deactivate Fulfiller
    end
    rect rgb(191, 223, 255)
    Fulfiller->>Placer: Request Resources
    activate Placer
    Placer->>Fulfiller: Resources Response
    deactivate Placer
    end
    alt optional
        rect rgb(191, 223, 255)
        Fulfiller->>Placer: Send Notification
        end
    end
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Request Results
    activate Fulfiller
    Fulfiller->>Placer: Results Response
    deactivate Fulfiller
    end
```

### security.html (#2) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/main/security.html)

```mermaid
flowchart LR
    Client <-->|Client Authentication & Token Issue| AS[Authorization Server]
    Client <-->|Presents Token<br>Grants or Denies Access| RS[Resource Server]
    RS -->|Validates Token| AS
```

### security.html (#3) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/main/security.html)

```mermaid
sequenceDiagram
  title Referral and External Service Requests Resource Fetching Flow

  participant C as Client (Fulfiller)
  participant AS as Authorization Server
  participant AG as API Gateway (Placer)
  participant PE as Policy Engine
  participant FHIR as FHIR Server / Consent Store (Placer)

  Note over C,AS: Machine-to-machine: Client Credentials flow
  C->>AS: Token request (client auth) + requested scopes<br/>(+ consent_id context if used)
  AS-->>C: Access token (scopes + claims)<br/>(optional: includes consent_id claim, <br/>optional: sender-constrained)

  C->>AG: API request + Authorization: Bearer <token>
  AG->>AG: Validate token (sig, iss, aud, exp, scopes)<br/>(+ validate sender-constraint if FAPI)
  AG->>PE: AuthZ decision request:<br/>(client identity, requested <br/>operation/resource,<br/>consent context from token/headers)
  PE->>FHIR: Fetch/validate Consent (by consent_id)<br/>+ evaluate rules / ownership / audience
  PE->>FHIR: Evaluate whether requested resource(s)<br/>are in ServiceRequest graph referenced by consent
  PE-->>AG: Permit / Deny
  alt Permit
    AG->>FHIR: Forward request
    FHIR->>C: Response: return permitted resources<br/>(+ optional fine-grained enforcement)
  else Deny
    AG-->>C: 403 Forbidden
  end
```

### security.html (#4) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/main/security.html)

```mermaid
flowchart TB
    Client -->|HTTP Request| API
    API -->|grant?| PE[Policy engine]
    PE -->|Yes/No| API
    API[API gateway] --->|Route request| RS[Resource Server]
```

### usecase-referral-orthopedic.html (#5) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/main/usecase-referral-orthopedic.html)

```mermaid
sequenceDiagram
    title Referral - Orthopedic Surgery

    participant Placer as Placer
    participant Fulfiller as Fulfiller
    activate Placer
    Placer->>Placer: POST ServiceRequest-ReferralOrthopedicSurgery
    Placer->>Fulfiller: POST Task (basedOn/focus: ServiceRequest-ReferralOrthopedicSurgery)
    activate Fulfiller
    Fulfiller-->>Placer: created
    deactivate Placer
    deactivate Fulfiller

    Fulfiller->>Placer: GET Resources (Diagnoses, Medications, Reports)
    activate Fulfiller
    activate Placer
    Placer-->>Fulfiller: return search results (Bundle)
    deactivate Fulfiller
    deactivate Placer

    Note over Fulfiller: Request additional information<br/>(smoking status) via Questionnaire
    Fulfiller->>Fulfiller: Update Task<br/>(owner: Placer, businessStatus: awaiting-information<br/>output: QuestionnaireSmokingStatus)
    activate Fulfiller
    Fulfiller-->>Placer: Notify Task updated
    activate Placer
    Placer->>Fulfiller: GET Task
    Fulfiller-->>Placer: Return Task
    Placer->>Fulfiller: GET Questionnaire by canonical
    Fulfiller-->>Placer: Return QuestionnaireSmokingStatus
    Placer-->>Placer: Practitioner fills out Questionnaire
    Placer->>Fulfiller: POST QuestionnaireResponse
    Fulfiller-->>Placer: created
    Placer->>Fulfiller: PATCH Task (owner: Fulfiller, input: QuestionnaireResponseSmokingStatus)
    Fulfiller-->>Placer: updated
    deactivate Placer
    deactivate Fulfiller

    Fulfiller->>Fulfiller: Update Task<br/>(businessStatus: completed, output: Report)
    activate Fulfiller
    Fulfiller-->>Placer: Notify Task updated
    activate Placer
    Placer->> Fulfiller: GET Task?_id=...&_include=Task:ch-umzhconnectig-task-outputreference
    Fulfiller-->>Placer: return result (Bundle)
    deactivate Placer
    deactivate Fulfiller
```

## umzhconnect/umzhconnect-ig @ improve-readme-add-samples

**Package:** `ch.fhir.ig.ch-umzh-connect#1.0.0-cibuild`

**CH UMZH Connect IG (R4)**

[Build](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/improve-readme-add-samples) · [GitHub](https://github.com/umzhconnect/umzhconnect-ig/tree/improve-readme-add-samples) · [Canonical](http://fhir.ch/ig/ch-umzh-connect/ImplementationGuide/ch.fhir.ig.ch-umzh-connect)

FHIR 4.0.1 · 2026-03-04

### core-concepts.html (#1) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/improve-readme-add-samples/core-concepts.html)

```mermaid
sequenceDiagram
    title Process flow between Placer and Fulfiller
    actor Placer
    actor Fulfiller
    activate Placer
    Placer->>Placer: Create Service Request
    deactivate Placer
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Create Task
    activate Fulfiller
    Fulfiller->>Placer: Task Response
    deactivate Fulfiller
    end
    rect rgb(191, 223, 255)
    Fulfiller->>Placer: Request Resources
    activate Placer
    Placer->>Fulfiller: Resources Response
    deactivate Placer
    end
    alt optional
        rect rgb(191, 223, 255)
        Fulfiller->>Placer: Send Notification
        end
    end
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Request Results
    activate Fulfiller
    Fulfiller->>Placer: Results Response
    deactivate Fulfiller
    end
```

### security.html (#2) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/improve-readme-add-samples/security.html)

```mermaid
flowchart LR
    Client <-->|Client Authentication & Token Issue| AS[Authorization Server]
    Client <-->|Presents Token<br>Grants or Denies Access| RS[Resource Server]
    RS -->|Validates Token| AS
```

### security.html (#3) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/improve-readme-add-samples/security.html)

```mermaid
sequenceDiagram
  title Referral and External Service Requests Resource Fetching Flow

  participant C as Client (Fulfiller)
  participant AS as Authorization Server
  participant AG as API Gateway (Placer)
  participant PE as Policy Engine
  participant FHIR as FHIR Server / Consent Store (Placer)

  Note over C,AS: Machine-to-machine: Client Credentials flow
  C->>AS: Token request (client auth) + requested scopes<br/>(+ consent_id context if used)
  AS-->>C: Access token (scopes + claims)<br/>(optional: includes consent_id claim, <br/>optional: sender-constrained)

  C->>AG: API request + Authorization: Bearer <token>
  AG->>AG: Validate token (sig, iss, aud, exp, scopes)<br/>(+ validate sender-constraint if FAPI)
  AG->>PE: AuthZ decision request:<br/>(client identity, requested <br/>operation/resource,<br/>consent context from token/headers)
  PE->>FHIR: Fetch/validate Consent (by consent_id)<br/>+ evaluate rules / ownership / audience
  PE->>FHIR: Evaluate whether requested resource(s)<br/>are in ServiceRequest graph referenced by consent
  PE-->>AG: Permit / Deny
  alt Permit
    AG->>FHIR: Forward request
    FHIR->>C: Response: return permitted resources<br/>(+ optional fine-grained enforcement)
  else Deny
    AG-->>C: 403 Forbidden
  end
```

### security.html (#4) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/improve-readme-add-samples/security.html)

```mermaid
flowchart TB
    Client -->|HTTP Request| API
    API -->|grant?| PE[Policy engine]
    PE -->|Yes/No| API
    API[API gateway] --->|Route request| RS[Resource Server]
```

### usecase-referral-orthopedic.html (#5) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/improve-readme-add-samples/usecase-referral-orthopedic.html)

```mermaid
sequenceDiagram
    title Referral - Orthopedic Surgery

    participant HospitalP as HospitalP(lacer)
    participant HospitalF as HospitalF(ulfiller)
    activate HospitalP
    HospitalP->>HospitalP: POST ServiceRequest-ReferralOrthopedicSurgery
    HospitalP->>HospitalF: POST Task (basedOn/focus: ServiceRequest-ReferralOrthopedicSurgery)
    activate HospitalF
    HospitalF-->>HospitalP: created
    deactivate HospitalP
    deactivate HospitalF
    
    HospitalF->>HospitalP: GET Resources (Diagnoses, Medications, Reports)
    activate HospitalF
    activate HospitalP
    HospitalP-->>HospitalF: return search results (Bundle)
    deactivate HospitalF
    deactivate HospitalP

    Note over HospitalF: Request additional information<br/>(smoking status) via Questionnaire
    HospitalF->>HospitalF: Update Task<br/>(owner: HospitalP, businessStatus: on-hold,<br/>output: QuestionnaireSmokingStatus)
    activate HospitalF
    HospitalF-->>HospitalP: Notify Task updated
    activate HospitalP
    HospitalP->>HospitalF: GET Task
    HospitalF-->>HospitalP: Return Task
    HospitalP->>HospitalF: GET Questionnaire by canonical
    HospitalF-->>HospitalP: Return QuestionnaireSmokingStatus
    HospitalP-->>HospitalP: Practitioner fills out Questionnaire
    HospitalP->>HospitalF: POST QuestionnaireResponse
    HospitalF-->>HospitalP: created
    HospitalP->>HospitalF: PATCH Task (owner: HospitalF, input: QuestionnaireResponseSmokingStatus)
    HospitalF-->>HospitalP: updated
    deactivate HospitalP
    deactivate HospitalF

    HospitalF->>HospitalF: Update Task<br/>(businessStatus: completed, output: Report)
    activate HospitalF
    HospitalF-->>HospitalP: Notify Task updated
    activate HospitalP
    HospitalP->> HospitalF: GET Task?_id=...&_include=Task:ch-umzhconnectig-task-outputreference
    HospitalF-->>HospitalP: return result (Bundle)
    deactivate HospitalP
    deactivate HospitalF
```

## umzhconnect/umzhconnect-ig @ fixes-index-page

**Package:** `ch.fhir.ig.ch-umzh-connect#1.0.0-cibuild`

**CH UMZH Connect IG (R4)**

[Build](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/fixes-index-page) · [GitHub](https://github.com/umzhconnect/umzhconnect-ig/tree/fixes-index-page) · [Canonical](http://fhir.ch/ig/ch-umzh-connect/ImplementationGuide/ch.fhir.ig.ch-umzh-connect)

FHIR 4.0.1 · 2026-03-05

### core-concepts.html (#1) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/fixes-index-page/core-concepts.html)

```mermaid
sequenceDiagram
    title Process flow between Placer and Fulfiller
    actor Placer
    actor Fulfiller
    activate Placer
    Placer->>Placer: Create Service Request
    deactivate Placer
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Create Task
    activate Fulfiller
    Fulfiller->>Placer: Task Response
    deactivate Fulfiller
    end
    rect rgb(191, 223, 255)
    Fulfiller->>Placer: Request Resources
    activate Placer
    Placer->>Fulfiller: Resources Response
    deactivate Placer
    end
    alt optional
        rect rgb(191, 223, 255)
        Fulfiller->>Placer: Send Notification
        end
    end
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Request Results
    activate Fulfiller
    Fulfiller->>Placer: Results Response
    deactivate Fulfiller
    end
```

### security.html (#2) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/fixes-index-page/security.html)

```mermaid
flowchart LR
    Client <-->|Client Authentication & Token Issue| AS[Authorization Server]
    Client <-->|Presents Token<br>Grants or Denies Access| RS[Resource Server]
    RS -->|Validates Token| AS
```

### security.html (#3) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/fixes-index-page/security.html)

```mermaid
sequenceDiagram
  title Referral and External Service Requests Resource Fetching Flow

  participant C as Client (Fulfiller)
  participant AS as Authorization Server
  participant AG as API Gateway (Placer)
  participant PE as Policy Engine
  participant FHIR as FHIR Server / Consent Store (Placer)

  Note over C,AS: Machine-to-machine: Client Credentials flow
  C->>AS: Token request (client auth) + requested scopes<br/>(+ consent_id context if used)
  AS-->>C: Access token (scopes + claims)<br/>(optional: includes consent_id claim, <br/>optional: sender-constrained)

  C->>AG: API request + Authorization: Bearer <token>
  AG->>AG: Validate token (sig, iss, aud, exp, scopes)<br/>(+ validate sender-constraint if FAPI)
  AG->>PE: AuthZ decision request:<br/>(client identity, requested <br/>operation/resource,<br/>consent context from token/headers)
  PE->>FHIR: Fetch/validate Consent (by consent_id)<br/>+ evaluate rules / ownership / audience
  PE->>FHIR: Evaluate whether requested resource(s)<br/>are in ServiceRequest graph referenced by consent
  PE-->>AG: Permit / Deny
  alt Permit
    AG->>FHIR: Forward request
    FHIR->>C: Response: return permitted resources<br/>(+ optional fine-grained enforcement)
  else Deny
    AG-->>C: 403 Forbidden
  end
```

### security.html (#4) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/fixes-index-page/security.html)

```mermaid
flowchart TB
    Client -->|HTTP Request| API
    API -->|grant?| PE[Policy engine]
    PE -->|Yes/No| API
    API[API gateway] --->|Route request| RS[Resource Server]
```

### usecase-referral-orthopedic.html (#5) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/fixes-index-page/usecase-referral-orthopedic.html)

```mermaid
sequenceDiagram
    title Referral - Orthopedic Surgery

    participant Placer as Placer
    participant Fulfiller as Fulfiller
    activate Placer
    Placer->>Placer: POST ServiceRequest-ReferralOrthopedicSurgery
    Placer->>Fulfiller: POST Task (basedOn/focus: ServiceRequest-ReferralOrthopedicSurgery)
    activate Fulfiller
    Fulfiller-->>Placer: created
    deactivate Placer
    deactivate Fulfiller

    Fulfiller->>Placer: GET Resources (Diagnoses, Medications, Reports)
    activate Fulfiller
    activate Placer
    Placer-->>Fulfiller: return search results (Bundle)
    deactivate Fulfiller
    deactivate Placer

    Note over Fulfiller: Request additional information<br/>(smoking status) via Questionnaire
    Fulfiller->>Fulfiller: Update Task<br/>(owner: Placer, businessStatus: on-hold,<br/>output: QuestionnaireSmokingStatus)
    activate Fulfiller
    Fulfiller-->>Placer: Notify Task updated
    activate Placer
    Placer->>Fulfiller: GET Task
    Fulfiller-->>Placer: Return Task
    Placer->>Fulfiller: GET Questionnaire by canonical
    Fulfiller-->>Placer: Return QuestionnaireSmokingStatus
    Placer-->>Placer: Practitioner fills out Questionnaire
    Placer->>Fulfiller: POST QuestionnaireResponse
    Fulfiller-->>Placer: created
    Placer->>Fulfiller: PATCH Task (owner: Fulfiller, input: QuestionnaireResponseSmokingStatus)
    Fulfiller-->>Placer: updated
    deactivate Placer
    deactivate Fulfiller

    Fulfiller->>Fulfiller: Update Task<br/>(businessStatus: completed, output: Report)
    activate Fulfiller
    Fulfiller-->>Placer: Notify Task updated
    activate Placer
    Placer->> Fulfiller: GET Task?_id=...&_include=Task:ch-umzhconnectig-task-outputreference
    Fulfiller-->>Placer: return result (Bundle)
    deactivate Placer
    deactivate Fulfiller
```

## umzhconnect/umzhconnect-ig @ aa_update_general_documentation

**Package:** `ch.fhir.ig.ch-umzh-connect#1.0.0-cibuild`

**CH UMZH Connect IG (R4)**

[Build](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/aa_update_general_documentation) · [GitHub](https://github.com/umzhconnect/umzhconnect-ig/tree/aa_update_general_documentation) · [Canonical](http://fhir.ch/ig/ch-umzh-connect/ImplementationGuide/ch.fhir.ig.ch-umzh-connect)

FHIR 4.0.1 · 2026-02-26

### core-concepts.html (#1) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/aa_update_general_documentation/core-concepts.html)

```mermaid
sequenceDiagram
    title Process flow between Placer and Fulfiller
    actor Placer
    actor Fulfiller
    activate Placer
    Placer->>Placer: Create Service Request
    deactivate Placer
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Create Task
    activate Fulfiller
    Fulfiller->>Placer: Task Response
    deactivate Fulfiller
    end
    rect rgb(191, 223, 255)
    Fulfiller->>Placer: Request Resources
    activate Placer
    Placer->>Fulfiller: Resources Response
    deactivate Placer
    end
    alt optional
        rect rgb(191, 223, 255)
        Fulfiller->>Placer: Send Notification
        end
    end
    rect rgb(191, 223, 255)
    Placer->>Fulfiller: Request Results
    activate Fulfiller
    Fulfiller->>Placer: Results Response
    deactivate Fulfiller
    end
```

### security.html (#2) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/aa_update_general_documentation/security.html)

```mermaid
flowchart LR
    Client <-->|Client Authentication & Token Issue| AS[Authorization Server]
    Client <-->|Presents Token<br>Grants or Denies Access| RS[Resource Server]
    RS -->|Validates Token| AS
```

### security.html (#3) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/aa_update_general_documentation/security.html)

```mermaid
sequenceDiagram
  title Referral and External Service Requests Resource Fetching Flow

  participant C as Client (Fulfiller)
  participant AS as Authorization Server
  participant AG as API Gateway (Placer)
  participant PE as Policy Engine
  participant FHIR as FHIR Server / Consent Store (Placer)

  Note over C,AS: Machine-to-machine: Client Credentials flow
  C->>AS: Token request (client auth) + requested scopes<br/>(+ consent_id context if used)
  AS-->>C: Access token (scopes + claims)<br/>(optional: includes consent_id claim, <br/>optional: sender-constrained)

  C->>AG: API request + Authorization: Bearer <token>
  AG->>AG: Validate token (sig, iss, aud, exp, scopes)<br/>(+ validate sender-constraint if FAPI)
  AG->>PE: AuthZ decision request:<br/>(client identity, requested <br/>operation/resource,<br/>consent context from token/headers)
  PE->>FHIR: Fetch/validate Consent (by consent_id)<br/>+ evaluate rules / ownership / audience
  PE->>FHIR: Evaluate whether requested resource(s)<br/>are in ServiceRequest graph referenced by consent
  PE-->>AG: Permit / Deny
  alt Permit
    AG->>FHIR: Forward request
    FHIR->>C: Response: return permitted resources<br/>(+ optional fine-grained enforcement)
  else Deny
    AG-->>C: 403 Forbidden
  end
```

### security.html (#4) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/aa_update_general_documentation/security.html)

```mermaid
flowchart TB
    Client -->|HTTP Request| API
    API -->|grant?| PE[Policy engine]
    PE -->|Yes/No| API
    API[API gateway] --->|Route request| RS[Resource Server]
```

### usecase-referral-orthopedic.html (#5) — [view page](https://build.fhir.org/ig/umzhconnect/umzhconnect-ig/branches/aa_update_general_documentation/usecase-referral-orthopedic.html)

```mermaid
sequenceDiagram
    actor HospitalP as HospitalP (Placer)
    actor HospitalF as HospitalF (Fulfiller)
    
    rect rgb(191, 223, 255)
    HospitalP->>HospitalP: Create ServiceRequest SR-HospitalP001
    HospitalP->>HospitalF: Create Task (focus: SR-HospitalP001)
    activate HospitalF
    HospitalF-->>HospitalP: Notify Task T-UKB001 created
    deactivate HospitalF
    end
    
    rect rgb(191, 223, 255)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(status: accepted)
    HospitalF->>HospitalP: Request Resources (Diagnoses, Medications)
    activate HospitalP
    HospitalP->>HospitalF: Resources Response
    deactivate HospitalP
    end
    
    rect rgb(191, 223, 255)
    HospitalF->>HospitalF: Create Questionnaire (smoking status)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(owner: Placer, businessStatus: on-hold,<br/>output: Questionnaire)
    HospitalF-->>HospitalP: Notify Task update
    activate HospitalP
    HospitalP->>HospitalF: Fetch Task T-UKB001
    HospitalF->>HospitalP: Response (Task incl. Questionnaire)
    HospitalP->>HospitalP: Fill out Questionnaire
    HospitalP->>HospitalF: Post QuestionnaireResponse (smoking status)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(owner: Fulfiller, businessStatus: in-progress,<br/>input: QuestionnaireResponse)
    deactivate HospitalP
    end
    
    rect rgb(255, 230, 204)
    Note over HospitalF: Create Appointment A-UKB001 (initial consult)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(status: in-progress, output: A-UKB001)
    HospitalF-->>HospitalP: Notify Task update
    end

    rect rgb(255, 230, 204)
    Note over HospitalF: Create Appointment A-UKB002 (preop)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(status: in-progress, output: A-UKB002)
    HospitalF-->>HospitalP: Notify Task update
    end

    rect rgb(204, 255, 204)
    Note over HospitalF: Create Appointment A-UKB003 (surgery)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(status: in-progress, output: A-UKB003)
    HospitalF-->>HospitalP: Notify Task update
    end
    
    rect rgb(204, 255, 204)
    HospitalF->>HospitalF: Update Task T-UKB001<br/>(status: completed, output: R-UKB001)
    HospitalF-->>HospitalP: Notify Task update
    end
```

## UPM-NTHC/PH-RoadSafetyIG @ main

**Package:** `example.fhir.ph.roadsafety#0.3.0`

**DRAFT PH Road Safety Implementation Guide**

[Build](https://build.fhir.org/ig/UPM-NTHC/PH-RoadSafetyIG/branches/main) · [GitHub](https://github.com/UPM-NTHC/PH-RoadSafetyIG/tree/main) · [Canonical](https://build.fhir.org/ig/UPM-NTHC/PH-RoadSafetyIG/ImplementationGuide/example.fhir.ph.roadsafety)

FHIR 4.0.1 · 2026-01-21

### data-modelling.html — [view page](https://build.fhir.org/ig/UPM-NTHC/PH-RoadSafetyIG/branches/main/data-modelling.html)

```mermaid
flowchart LR
  Patient[Patient]
  Encounter[Encounter]
  Observation[Observation]
  Condition[Condition]
  Procedure[Procedure]
  DocumentReference[DocumentReference]
  Location[Location]
  Organization[Organization]

  Patient -->|subject of| Encounter
  Encounter -->|has observations| Observation
  Encounter -->|has diagnoses| Condition
  Encounter -->|has procedures| Procedure
  Encounter -->|serviceProvider| Organization
  Encounter -->|occursAt| Location
  Observation -->|derivedFrom| DocumentReference
  DocumentReference -->|attachment for| Encounter

  style Patient fill:#f9f,stroke:#333,stroke-width:1px
  style Observation fill:#ff9,stroke:#333,stroke-width:1px
```

