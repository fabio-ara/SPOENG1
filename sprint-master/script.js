const APP_STORAGE_KEY = "sprint-master-state";
const LEGACY_PROJECTS_STORAGE_KEY = "sprint-master-projects";
const LEGACY_MEMBERS_STORAGE_KEY = "sprint-master-members";
const DEFAULT_MEMBERS = ["Fabio Ara", "Lucas Toffetti", "Osvaldo Matteos"];
const DEFAULT_PROJECT_SEED = {
  id: "seed-sprint-master",
  nome: "Sprint Master",
  desc: "Projeto-meta do próprio trabalho, usado como exemplo inicial do sistema.",
  prazo: "2026-06-20",
  criado: "2026-06-15T12:00:00.000Z",
  ats: [
    {
      id: "seed-atividade-1",
      tit: "Estruturar repositório e documentação inicial",
      resp: "Fabio Ara",
      st: "concluído"
    },
    {
      id: "seed-atividade-2",
      tit: "Implementar projetos, atividades e progresso",
      resp: "Fabio Ara",
      st: "concluído"
    },
    {
      id: "seed-atividade-3",
      tit: "Mover formulários para overlays",
      resp: "Fabio Ara",
      st: "concluído"
    },
    {
      id: "seed-atividade-4",
      tit: "Adicionar painel para subir e baixar JSON",
      resp: "Fabio Ara",
      st: "concluído"
    },
    {
      id: "seed-atividade-5",
      tit: "Executar checklist manual em TESTES.md",
      resp: "Lucas Toffetti",
      st: "concluído"
    },
    {
      id: "seed-atividade-6",
      tit: "Revisar backlog, review e retrospective",
      resp: "Lucas Toffetti",
      st: "concluído"
    }
  ]
};
const STATUS_OPTIONS = [
  { value: "a fazer", label: "A fazer" },
  { value: "em andamento", label: "Em andamento" },
  { value: "concluído", label: "Concluído" }
];
const VALID_STATUS = new Set(STATUS_OPTIONS.map((status) => status.value));
const LEGACY_STATUS_MAP = {
  andando: "em andamento",
  concluido: "concluído"
};

const openJsonOverlayButton = document.querySelector("#open-json-overlay");
const openMembersOverlayButton = document.querySelector("#open-members-overlay");
const openProjectOverlayButton = document.querySelector("#open-project-overlay");
const jsonOverlay = document.querySelector("#json-overlay");
const membersOverlay = document.querySelector("#members-overlay");
const projectOverlay = document.querySelector("#project-overlay");
const projectForm = document.querySelector("#project-form");
const projectFormPanel = document.querySelector(".overlay-panel--editing");
const projectFormTitle = document.querySelector("#project-form-title");
const projectFormCancelButton = document.querySelector("#project-form-cancel");
const memberForm = document.querySelector("#member-form");
const jsonScope = document.querySelector("#json-scope");
const jsonTextarea = document.querySelector("#json-textarea");
const jsonFileInput = document.querySelector("#json-file-input");
const jsonDownloadButton = document.querySelector("#json-download-button");
const jsonCopyButton = document.querySelector("#json-copy-button");
const jsonUploadButton = document.querySelector("#json-upload-button");
const memberFeedback = document.querySelector("#member-feedback");
const jsonFeedback = document.querySelector("#json-feedback");
const projectsList = document.querySelector("#projects-list");
const emptyState = document.querySelector("#projects-empty-state");
const feedback = document.querySelector("#form-feedback");
const totalProjects = document.querySelector("#total-projects");
const totalActivities = document.querySelector("#total-activities");
const completedActivities = document.querySelector("#completed-activities");
const overallProgress = document.querySelector("#overall-progress");
const membersList = document.querySelector("#members-list");
const membersEmptyState = document.querySelector("#members-empty-state");
const projectCardTemplate = document.querySelector("#project-card-template");

let members = [];
let projects = [];
let editingProjectId = null;

initializeState();

function initializeState() {
  const state = loadState();
  members = state.members;
  projects = state.projects;
  saveState();
}

function loadState() {
  try {
    const rawState = localStorage.getItem(APP_STORAGE_KEY);

    if (rawState) {
      return normalizeImportedState(JSON.parse(rawState), "all");
    }
  } catch (error) {
    console.error("Erro ao carregar o estado principal:", error);
  }

  return migrateLegacyState();
}

function migrateLegacyState() {
  try {
    const rawMembers = localStorage.getItem(LEGACY_MEMBERS_STORAGE_KEY);
    const rawProjects = localStorage.getItem(LEGACY_PROJECTS_STORAGE_KEY);
    const legacyMembers = rawMembers ? JSON.parse(rawMembers) : DEFAULT_MEMBERS;
    const legacyProjects = rawProjects ? JSON.parse(rawProjects) : [];
    const normalizedProjects = normalizeProjects(legacyProjects);
    const nextProjects = normalizedProjects.length > 0 ? normalizedProjects : createSeedProjects();
    const normalizedMembers = syncMembersWithProjects(normalizeMembers(legacyMembers), nextProjects);

    return {
      members: normalizedMembers,
      projects: nextProjects
    };
  } catch (error) {
    console.error("Erro ao migrar o estado legado:", error);
    return {
      members: [...DEFAULT_MEMBERS],
      projects: createSeedProjects()
    };
  }
}

function saveState() {
  const compactState = serializeScope("all");
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(compactState));
  localStorage.removeItem(LEGACY_MEMBERS_STORAGE_KEY);
  localStorage.removeItem(LEGACY_PROJECTS_STORAGE_KEY);
}

function generateId() {
  return `item-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function normalizeStatus(status) {
  const normalized = LEGACY_STATUS_MAP[String(status || "").trim()] || String(status || "").trim();
  return VALID_STATUS.has(normalized) ? normalized : "a fazer";
}

function hasMemberName(memberList, name) {
  return memberList.some(
    (currentMember) => currentMember.localeCompare(name, "pt-BR", { sensitivity: "base" }) === 0
  );
}

function normalizeMembers(rawMembers, fallbackMembers = DEFAULT_MEMBERS) {
  if (!Array.isArray(rawMembers)) {
    return [...fallbackMembers];
  }

  const uniqueMembers = [];

  rawMembers.forEach((member) => {
    const name = String(member || "").trim();

    if (!name) {
      return;
    }

    if (!hasMemberName(uniqueMembers, name)) {
      uniqueMembers.push(name);
    }
  });

  return uniqueMembers;
}

function normalizeActivities(rawActivities) {
  if (!Array.isArray(rawActivities)) {
    return [];
  }

  return rawActivities
    .map((activity) => {
      const title = String(activity?.title ?? activity?.tit ?? "").trim();
      const responsible = String(activity?.responsible ?? activity?.resp ?? "").trim();

      if (!title || !responsible) {
        return null;
      }

      return {
        id: String(activity?.id || generateId()),
        title,
        responsible,
        status: normalizeStatus(activity?.status ?? activity?.st)
      };
    })
    .filter(Boolean);
}

function normalizeProjects(rawProjects) {
  if (!Array.isArray(rawProjects)) {
    return [];
  }

  return rawProjects
    .map((project) => {
      const name = String(project?.name ?? project?.nome ?? "").trim();

      if (!name) {
        return null;
      }

      return {
        id: String(project?.id || generateId()),
        name,
        description: String(project?.description ?? project?.desc ?? "").trim(),
        deadline: String(project?.deadline ?? project?.prazo ?? "").trim(),
        activities: normalizeActivities(project?.activities ?? project?.ats),
        createdAt: String(project?.createdAt ?? project?.criado ?? new Date().toISOString())
      };
    })
    .filter(Boolean);
}

function syncMembersWithProjects(baseMembers, baseProjects) {
  const syncedMembers = [...baseMembers];

  baseProjects.forEach((project) => {
    project.activities.forEach((activity) => {
      const responsible = String(activity.responsible || "").trim();

      if (responsible && !hasMemberName(syncedMembers, responsible)) {
        syncedMembers.push(responsible);
      }
    });
  });

  return syncedMembers;
}

function normalizeImportedState(rawValue, scope) {
  if (scope === "members") {
    const membersValue = Array.isArray(rawValue) ? rawValue : rawValue?.resp ?? rawValue?.members;

    if (!Array.isArray(membersValue)) {
      throw new Error("Escopo de responsáveis inválido.");
    }

    return {
      members: syncMembersWithProjects(normalizeMembers(membersValue, []), projects),
      projects: [...projects]
    };
  }

  if (scope === "projects") {
    const projectsValue = Array.isArray(rawValue) ? rawValue : rawValue?.proj ?? rawValue?.projects;

    if (!Array.isArray(projectsValue)) {
      throw new Error("Escopo de projetos inválido.");
    }

    const normalizedProjects = normalizeProjects(projectsValue);

    return {
      members: syncMembersWithProjects([...members], normalizedProjects),
      projects: normalizedProjects
    };
  }

  const importedMembers = rawValue?.resp ?? rawValue?.members;
  const importedProjects = rawValue?.proj ?? rawValue?.projects;
  if (!Array.isArray(importedMembers) || !Array.isArray(importedProjects)) {
    throw new Error("Estrutura principal inválida.");
  }

  const normalizedProjects = normalizeProjects(importedProjects);

  return {
    members: syncMembersWithProjects(normalizeMembers(importedMembers, []), normalizedProjects),
    projects: normalizedProjects
  };
}

function serializeProject(project) {
  return {
    id: project.id,
    nome: project.name,
    desc: project.description || "",
    prazo: project.deadline || "",
    criado: project.createdAt,
    ats: project.activities.map((activity) => ({
      id: activity.id,
      tit: activity.title,
      resp: activity.responsible,
      st: activity.status
    }))
  };
}

function createSeedProjects() {
  return normalizeProjects([DEFAULT_PROJECT_SEED]);
}

function serializeScope(scope) {
  if (scope === "members") {
    return { resp: [...members] };
  }

  if (scope === "projects") {
    return { proj: projects.map(serializeProject) };
  }

  return {
    resp: [...members],
    proj: projects.map(serializeProject)
  };
}

function exportScope(scope) {
  return JSON.stringify(serializeScope(scope), null, 2);
}

function buildJsonFilename(scope) {
  if (scope === "projects") {
    return "sprint-master-projetos.json";
  }

  if (scope === "members") {
    return "sprint-master-responsaveis.json";
  }

  return "sprint-master-tudo.json";
}

function createProject({ name, description, deadline }) {
  return {
    id: generateId(),
    name,
    description,
    deadline,
    activities: [],
    createdAt: new Date().toISOString()
  };
}

function createActivity({ title, responsible }) {
  return {
    id: generateId(),
    title,
    responsible,
    status: "a fazer"
  };
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sem prazo";
  }

  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function setFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.classList.toggle("form-feedback--error", isError);
}

function setMemberFeedback(message, isError = false) {
  memberFeedback.textContent = message;
  memberFeedback.classList.toggle("form-feedback--error", isError);
}

function setJsonFeedback(message, isError = false) {
  jsonFeedback.textContent = message;
  jsonFeedback.classList.toggle("form-feedback--error", isError);
}

function openOverlay(overlay) {
  overlay.hidden = false;
  overlay.setAttribute("aria-hidden", "false");
}

function closeOverlay(overlay) {
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
}

function resetProjectForm() {
  projectForm.reset();
  projectForm.elements.projectId.value = "";
  editingProjectId = null;
  projectFormTitle.textContent = "Novo projeto";
  projectFormCancelButton.hidden = true;
  projectFormPanel.classList.remove("panel--editing");
}

function refreshJsonTextarea() {
  jsonTextarea.value = exportScope(jsonScope.value);
}

function resetJsonPanel() {
  jsonScope.value = "all";
  refreshJsonTextarea();
  jsonFileInput.value = "";
  setJsonFeedback("");
}

function startProjectEdit(project) {
  openOverlay(projectOverlay);
  editingProjectId = project.id;
  projectForm.elements.projectId.value = project.id;
  projectForm.elements.name.value = project.name;
  projectForm.elements.description.value = project.description || "";
  projectForm.elements.deadline.value = project.deadline || "";
  projectFormTitle.textContent = "Editar projeto";
  projectFormCancelButton.hidden = false;
  projectFormPanel.classList.add("panel--editing");
}

function calculateProjectProgress(project) {
  const total = project.activities.length;

  if (total === 0) {
    return 0;
  }

  const completed = project.activities.filter((activity) => activity.status === "concluído").length;
  return Math.round((completed / total) * 100);
}

function calculateTotals() {
  const activityCount = projects.reduce((sum, project) => sum + project.activities.length, 0);
  const completedCount = projects.reduce(
    (sum, project) => sum + project.activities.filter((activity) => activity.status === "concluído").length,
    0
  );

  return {
    activityCount,
    completedCount,
    overallPercent: activityCount === 0 ? 0 : Math.round((completedCount / activityCount) * 100)
  };
}

function renderDashboard() {
  const totals = calculateTotals();
  totalProjects.textContent = String(projects.length);
  totalActivities.textContent = String(totals.activityCount);
  completedActivities.textContent = String(totals.completedCount);
  overallProgress.textContent = `${totals.overallPercent}%`;
}

function memberIsInUse(memberName) {
  return projects.some((project) => project.activities.some((activity) => activity.responsible === memberName));
}

function createTrashIcon() {
  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4 7h16"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 4h6l1 3H8z"/>
      <path d="M6 7l1 12h10l1-12"/>
    </svg>
  `;
}

function renderAll() {
  renderDashboard();
  renderMembers();
  renderProjects();
}

function updateProject(projectId, updates) {
  projects = projects.map((project) => (
    project.id === projectId
      ? {
          ...project,
          name: updates.name,
          description: updates.description,
          deadline: updates.deadline
        }
      : project
  ));

  saveState();
  renderAll();
  resetProjectForm();
  setFeedback("Projeto atualizado com sucesso.");
}

function renderMembers() {
  membersList.innerHTML = "";

  if (members.length === 0) {
    membersEmptyState.hidden = false;
    return;
  }

  membersEmptyState.hidden = true;

  members.forEach((member) => {
    const item = document.createElement("li");
    item.className = "member-chip";

    item.innerHTML = `
      <span class="member-chip__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="8" r="3.5"/>
          <path d="M5 19a7 7 0 0 1 14 0"/>
        </svg>
      </span>
      <span class="member-chip__name">${member}</span>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "icon-button";
    deleteButton.setAttribute("aria-label", `Excluir responsável ${member}`);
    deleteButton.title = "Excluir responsável";
    deleteButton.innerHTML = createTrashIcon();
    deleteButton.disabled = memberIsInUse(member);

    deleteButton.addEventListener("click", () => {
      if (memberIsInUse(member)) {
        setMemberFeedback("Não é possível excluir um responsável já usado em atividade.", true);
        return;
      }

      members = members.filter((currentMember) => currentMember !== member);
      saveState();
      renderAll();
      setMemberFeedback("Responsável excluído.");
      refreshJsonTextarea();
    });

    item.append(deleteButton);
    membersList.append(item);
  });
}

function createResponsibleOptions(select, selectedValue = "") {
  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Responsável";
  placeholder.disabled = true;
  placeholder.selected = !selectedValue;
  select.append(placeholder);

  members.forEach((member) => {
    const option = document.createElement("option");
    option.value = member;
    option.textContent = member;
    option.selected = member === selectedValue;
    select.append(option);
  });
}

function createStatusSelect(projectId, activity) {
  const select = document.createElement("select");
  select.className = "activity-status";
  select.setAttribute("aria-label", `Status da atividade ${activity.title}`);

  STATUS_OPTIONS.forEach((status) => {
    const option = document.createElement("option");
    option.value = status.value;
    option.textContent = status.label;
    option.selected = activity.status === status.value;
    select.append(option);
  });

  select.addEventListener("change", (event) => {
    updateActivityStatus(projectId, activity.id, event.target.value);
  });

  return select;
}

function renderProjects() {
  projectsList.innerHTML = "";

  if (projects.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const sortedProjects = [...projects].sort((firstProject, secondProject) => {
    if (firstProject.deadline && secondProject.deadline) {
      return firstProject.deadline.localeCompare(secondProject.deadline);
    }

    if (firstProject.deadline) {
      return -1;
    }

    if (secondProject.deadline) {
      return 1;
    }

    return secondProject.createdAt.localeCompare(firstProject.createdAt);
  });

  sortedProjects.forEach((project) => {
    const cardFragment = projectCardTemplate.content.cloneNode(true);
    const title = cardFragment.querySelector(".project-card__title");
    const description = cardFragment.querySelector(".project-card__description");
    const status = cardFragment.querySelector(".project-card__status");
    const deadlineTag = cardFragment.querySelector(".project-deadline-tag");
    const progressTag = cardFragment.querySelector(".project-progress-tag");
    const deleteButton = cardFragment.querySelector(".project-delete-button");
    const editButton = cardFragment.querySelector(".project-edit-button");
    const activityCounter = cardFragment.querySelector(".activities__counter");
    const activityForm = cardFragment.querySelector(".activity-form");
    const projectIdField = cardFragment.querySelector('input[name="projectId"]');
    const responsibleSelect = cardFragment.querySelector('select[name="responsible"]');
    const activityList = cardFragment.querySelector(".activity-list");
    const activityEmptyState = cardFragment.querySelector(".activities-empty-state");
    const progress = calculateProjectProgress(project);

    title.textContent = project.name;
    description.textContent = project.description || "";
    description.hidden = !project.description;
    status.textContent = `${progress}%`;
    deadlineTag.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2"/>
        <path d="M8 3v4M16 3v4M4 10h16"/>
      </svg>
      <span>${formatDate(project.deadline)}</span>
    `;
    progressTag.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 4a8 8 0 1 1-8 8"/>
        <path d="M12 4v8h8"/>
      </svg>
      <span>${progress}%</span>
    `;
    activityCounter.textContent = `${project.activities.length} item(ns)`;
    projectIdField.value = project.id;
    createResponsibleOptions(responsibleSelect);

    deleteButton.setAttribute("aria-label", `Excluir projeto ${project.name}`);
    deleteButton.addEventListener("click", () => {
      deleteProject(project.id);
    });

    editButton.setAttribute("aria-label", `Editar projeto ${project.name}`);
    editButton.addEventListener("click", () => {
      startProjectEdit(project);
      projectForm.elements.name.focus();
    });

    activityForm.addEventListener("submit", handleActivitySubmit);

    if (project.activities.length === 0) {
      activityEmptyState.hidden = false;
    } else {
      activityEmptyState.hidden = true;

      project.activities.forEach((activity) => {
        const item = document.createElement("li");
        item.className = "activity-item";

        const itemHead = document.createElement("div");
        itemHead.className = "activity-item__head";

        const copy = document.createElement("div");
        const activityTitle = document.createElement("div");
        activityTitle.className = "activity-item__title";
        activityTitle.textContent = activity.title;

        const responsible = document.createElement("p");
        responsible.className = "activity-item__responsible";
        responsible.innerHTML = `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5"/>
            <path d="M5 19a7 7 0 0 1 14 0"/>
          </svg>
          <span>${activity.responsible}</span>
        `;

        copy.append(activityTitle, responsible);

        const controls = document.createElement("div");
        controls.className = "activity-item__controls";

        const statusSelect = createStatusSelect(project.id, activity);

        const deleteActivityButton = document.createElement("button");
        deleteActivityButton.type = "button";
        deleteActivityButton.className = "icon-button";
        deleteActivityButton.setAttribute("aria-label", `Excluir atividade ${activity.title}`);
        deleteActivityButton.title = "Excluir atividade";
        deleteActivityButton.innerHTML = createTrashIcon();
        deleteActivityButton.addEventListener("click", () => {
          deleteActivity(project.id, activity.id);
        });

        controls.append(statusSelect, deleteActivityButton);
        itemHead.append(copy, controls);
        item.append(itemHead);
        activityList.append(item);
      });
    }

    projectsList.append(cardFragment);
  });
}

function deleteProject(projectId) {
  if (editingProjectId === projectId) {
    resetProjectForm();
  }

  projects = projects.filter((project) => project.id !== projectId);
  saveState();
  renderAll();
  setFeedback("Projeto excluído.");
  refreshJsonTextarea();
}

function addActivity(projectId, { title, responsible }) {
  const activity = createActivity({ title, responsible });

  projects = projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      activities: [...project.activities, activity]
    };
  });

  saveState();
  renderAll();
  refreshJsonTextarea();
}

function updateActivityStatus(projectId, activityId, newStatus) {
  const normalizedStatus = normalizeStatus(newStatus);

  projects = projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      activities: project.activities.map((activity) => (
        activity.id === activityId
          ? { ...activity, status: normalizedStatus }
          : activity
      ))
    };
  });

  saveState();
  renderDashboard();
  renderProjects();
  refreshJsonTextarea();
}

function deleteActivity(projectId, activityId) {
  projects = projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      activities: project.activities.filter((activity) => activity.id !== activityId)
    };
  });

  saveState();
  renderAll();
  setFeedback("Atividade excluída.");
  refreshJsonTextarea();
}

function handleMemberSubmit(event) {
  event.preventDefault();

  const formData = new FormData(memberForm);
  const memberName = String(formData.get("memberName") || "").trim();

  if (!memberName) {
    setMemberFeedback("Informe o nome do responsável.", true);
    return;
  }

  if (hasMemberName(members, memberName)) {
    setMemberFeedback("Esse responsável já existe.", true);
    return;
  }

  members.push(memberName);
  saveState();
  renderAll();
  memberForm.reset();
  setMemberFeedback("Responsável adicionado com sucesso.");
  refreshJsonTextarea();
}

function handleProjectSubmit(event) {
  event.preventDefault();

  const formData = new FormData(projectForm);
  const projectId = String(formData.get("projectId") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const deadline = String(formData.get("deadline") || "").trim();

  if (!name) {
    setFeedback("Informe o nome do projeto antes de salvar.", true);
    return;
  }

  if (projectId) {
    updateProject(projectId, { name, description, deadline });
    closeOverlay(projectOverlay);
    refreshJsonTextarea();
    return;
  }

  const newProject = createProject({ name, description, deadline });
  projects.push(newProject);
  saveState();
  renderAll();
  resetProjectForm();
  closeOverlay(projectOverlay);
  setFeedback("Projeto salvo com sucesso.");
  refreshJsonTextarea();
}

function handleActivitySubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const projectId = String(formData.get("projectId") || "");
  const title = String(formData.get("title") || "").trim();
  const responsible = String(formData.get("responsible") || "").trim();

  if (!title || !responsible) {
    setFeedback("Informe título e responsável da atividade.", true);
    return;
  }

  addActivity(projectId, { title, responsible });
  form.reset();
  createResponsibleOptions(form.elements.responsible);
  setFeedback("Atividade adicionada com sucesso.");
}

function handleJsonDownload() {
  try {
    refreshJsonTextarea();
    const jsonBlob = new Blob([jsonTextarea.value], { type: "application/json" });
    const downloadLink = document.createElement("a");
    const downloadUrl = URL.createObjectURL(jsonBlob);

    downloadLink.href = downloadUrl;
    downloadLink.download = buildJsonFilename(jsonScope.value);
    downloadLink.click();
    URL.revokeObjectURL(downloadUrl);
    setJsonFeedback("Download do JSON iniciado.");
  } catch (error) {
    console.error("Erro ao baixar JSON:", error);
    setJsonFeedback("Não foi possível baixar o JSON.", true);
  }
}

async function handleJsonCopy() {
  try {
    refreshJsonTextarea();
    await navigator.clipboard.writeText(jsonTextarea.value);
    setJsonFeedback("JSON copiado.");
  } catch (error) {
    console.error("Erro ao copiar JSON:", error);
    setJsonFeedback("Não foi possível copiar o JSON.", true);
  }
}

function applyImportedJson(rawJson) {
  const previousStateSnapshot = JSON.stringify(serializeScope("all"));
  const importedState = normalizeImportedState(JSON.parse(rawJson), jsonScope.value);
  members = importedState.members;
  projects = importedState.projects;

  if (editingProjectId && !projects.some((project) => project.id === editingProjectId)) {
    resetProjectForm();
  }

  saveState();
  renderAll();
  refreshJsonTextarea();
  setFeedback("");
  setMemberFeedback("");
  return previousStateSnapshot !== JSON.stringify(serializeScope("all"));
}

function handleJsonUpload() {
  jsonFileInput.value = "";
  jsonFileInput.click();
}

async function handleJsonFileSelection(event) {
  try {
    const [selectedFile] = event.currentTarget.files || [];

    if (!selectedFile) {
      return;
    }

    const rawJson = (await selectedFile.text()).trim();

    if (!rawJson) {
      setJsonFeedback("O arquivo selecionado está vazio.", true);
      return;
    }

    jsonTextarea.value = rawJson;
    const hasChanged = applyImportedJson(rawJson);
    closeOverlay(jsonOverlay);
    setFeedback(hasChanged ? "Dados atualizados via JSON." : "JSON carregado sem alterações.");
    setJsonFeedback(hasChanged ? "JSON subido com sucesso." : "JSON subido sem alterações.");
  } catch (error) {
    console.error("Erro ao subir JSON:", error);
    setJsonFeedback("JSON inválido para o escopo selecionado.", true);
  } finally {
    event.currentTarget.value = "";
  }
}

memberForm.addEventListener("submit", handleMemberSubmit);
projectForm.addEventListener("submit", handleProjectSubmit);
projectFormCancelButton.addEventListener("click", () => {
  resetProjectForm();
  closeOverlay(projectOverlay);
  setFeedback("");
});
jsonScope.addEventListener("change", () => {
  refreshJsonTextarea();
  setJsonFeedback("");
});
jsonDownloadButton.addEventListener("click", handleJsonDownload);
jsonCopyButton.addEventListener("click", handleJsonCopy);
jsonUploadButton.addEventListener("click", handleJsonUpload);
jsonFileInput.addEventListener("change", handleJsonFileSelection);
openJsonOverlayButton.addEventListener("click", () => {
  resetJsonPanel();
  openOverlay(jsonOverlay);
  jsonTextarea.focus();
});
openMembersOverlayButton.addEventListener("click", () => {
  openOverlay(membersOverlay);
  setMemberFeedback("");
  memberForm.elements.memberName.focus();
});
openProjectOverlayButton.addEventListener("click", () => {
  resetProjectForm();
  openOverlay(projectOverlay);
  projectForm.elements.name.focus();
});
document.querySelectorAll("[data-close-overlay='json']").forEach((button) => {
  button.addEventListener("click", () => closeOverlay(jsonOverlay));
});
document.querySelectorAll("[data-close-overlay='members']").forEach((button) => {
  button.addEventListener("click", () => closeOverlay(membersOverlay));
});
document.querySelectorAll("[data-close-overlay='project']").forEach((button) => {
  button.addEventListener("click", () => {
    resetProjectForm();
    closeOverlay(projectOverlay);
  });
});
[jsonOverlay, membersOverlay, projectOverlay].forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      if (overlay === projectOverlay) {
        resetProjectForm();
      }

      closeOverlay(overlay);
    }
  });
});

renderAll();
