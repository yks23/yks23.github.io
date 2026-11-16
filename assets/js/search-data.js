// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Research projects in agents, physical intelligence, and efficient generation.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "news-awarded-the-wangdazhong-scholarship-20000-rmb",
          title: 'Awarded the WangDazhong Scholarship (20000 RMB).',
          description: "",
          section: "News",},{id: "news-our-paper-tree-kg-has-been-accepted-to-acl-2025",
          title: 'Our paper, Tree-KG, has been accepted to ACL 2025!',
          description: "",
          section: "News",},{id: "news-our-paper-impromptu-vla-has-been-accepted-to-neurips-2025",
          title: 'Our paper, Impromptu VLA, has been accepted to NeurIPS 2025!',
          description: "",
          section: "News",},{id: "news-receive-30-000-rmb-in-support-from-the-beijing-natural-science-foundation-for-my-research-project",
          title: '💰 Receive ¥30,000 RMB in support from the Beijing Natural Science Foundation for...',
          description: "",
          section: "News",},{id: "news-awarded-2025-计算机系年度人物-and-ruiqi-scholarship-20000-rmb",
          title: 'Awarded 2025 计算机系年度人物 and Ruiqi Scholarship (20000 RMB).',
          description: "",
          section: "News",},{id: "news-our-paper-cubebench-has-been-accepted-to-iclr-2026",
          title: 'Our paper, CubeBench, has been accepted to ICLR 2026!',
          description: "",
          section: "News",},{id: "news-our-paper-pam-has-been-accepted-to-cvpr-2026",
          title: 'Our paper, PAM, has been accepted to CVPR 2026!',
          description: "",
          section: "News",},{id: "news-information-gain-sampler-and-robuq-have-been-accepted-to-icml-2026",
          title: 'Information-Gain Sampler and RobuQ have been accepted to ICML 2026.',
          description: "",
          section: "News",},{id: "news-i-became-chairman-of-sast-of-the-computer-science-and-technology-cst-department",
          title: 'I became Chairman of SAST of the Computer Science and Technology (CST) department....',
          description: "",
          section: "News",},{id: "news-our-paper-voidpadding-is-released-on-arxiv-later-accepted-to-colm-2026-workshop-on-efficient-reasoning",
          title: 'Our paper, VoidPadding, is released on arXiv. Later accepted to COLM 2026 Workshop...',
          description: "",
          section: "News",},{id: "news-awarded-the-sensetime-scholarship-2026",
          title: 'Awarded the SenseTime Scholarship 2026.',
          description: "",
          section: "News",},{id: "news-selected-for-the-ccf-excellent-undergraduate-launch-program",
          title: 'Selected for the CCF Excellent Undergraduate Launch Program.',
          description: "",
          section: "News",},{id: "news-our-paper-march-introduces-content-routed-state-anchors-for-recurrent-memory",
          title: 'Our paper MARCH introduces content-routed state anchors for recurrent memory.',
          description: "",
          section: "News",},{id: "news-released-ai4ai-bench-a-benchmark-for-algorithmic-design-and-recursive-self-improvement",
          title: 'Released AI4AI-Bench, a benchmark for algorithmic design and recursive self-improvement.',
          description: "",
          section: "News",},{id: "news-our-paper-swe-refactor-bench-evaluates-coding-agents-on-whole-repository-stack-migration",
          title: 'Our paper SWE Refactor Bench evaluates coding agents on whole-repository stack migration.',
          description: "",
          section: "News",},{id: "news-released-safin-1-exploring-safety-through-memory-native-state-evolution",
          title: 'Released Safin-1, exploring safety through memory-native state evolution.',
          description: "",
          section: "News",},{id: "news-awarded-rmb-100-000-in-undergraduate-research-funding-from-the-national-natural-science-foundation-of-china-nsfc",
          title: 'Awarded RMB 100,000 in undergraduate research funding from the National Natural Science Foundation...',
          description: "",
          section: "News",},{id: "news-our-paper-frontier-eng-has-been-accepted-to-neurips-2026",
          title: 'Our paper, Frontier-Eng, has been accepted to NeurIPS 2026!',
          description: "",
          section: "News",},{id: "news-our-preprint-justquant-explores-4-bit-activation-quantization-without-smoothing-svd-or-rotation",
          title: 'Our preprint JustQuant explores 4-bit activation quantization without smoothing, SVD, or rotation.',
          description: "",
          section: "News",},{id: "news-we-update-pptbench-evaluating-coding-agents-on-reconstructing-visual-content-as-structured-editable-slides",
          title: 'We update PPTBench, evaluating coding agents on reconstructing visual content as structured, editable...',
          description: "",
          section: "News",},{id: "news-we-introduce-world-models-last-exam-in-physics-evaluating-world-models-understanding-of-physics",
          title: 'We introduce World Models’ Last Exam in Physics, evaluating world models’ understanding of...',
          description: "",
          section: "News",},{id: "news-introducing-aaarena-a-long-running-game-agent-competition-for-evaluating-heuristic-learning",
          title: 'Introducing AAArena, a long-running game-agent competition for evaluating heuristic learning.',
          description: "",
          section: "News",},{id: "news-we-release-embodiedevo-exploring-self-evolving-coding-agents-for-physical-intelligence",
          title: 'We release EmbodiedEvo, exploring self-evolving coding agents for physical intelligence.',
          description: "",
          section: "News",},{id: "news-introducing-diabagent-a-framework-and-benchmark-for-studying-agentic-physiological-control-in-simulation",
          title: 'Introducing DiabAgent, a framework and benchmark for studying agentic physiological control in simulation....',
          description: "",
          section: "News",},{id: "projects-browserbc",
          title: 'BrowserBC',
          description: "BrowserBC distills successful human browser trajectories into reusable skills, helping web agents solve tasks with higher success rates and fewer interactions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/01-browserbc/";
            },},{id: "projects-frontier-engineering",
          title: 'Frontier-Engineering',
          description: "A benchmark of 47 real-world engineering optimization tasks for evaluating iterative AI agents under verifier-grounded feedback.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/02-frontier-engineering/";
            },},{id: "projects-ai4ai-bench",
          title: 'AI4AI-Bench',
          description: "A benchmark for evaluating LLM agents on algorithmic design for recursive self-improvement.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03-ai4ai-bench/";
            },},{id: "projects-diabagent",
          title: 'DiabAgent',
          description: "Toward Agentic Physiological Control.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04-diabagent/";
            },},{id: "projects-embodiedevo",
          title: 'EmbodiedEvo',
          description: "Self-evolving coding agents that reuse skills and lessons from physical interaction.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05-embodiedevo/";
            },},{id: "projects-aaarena",
          title: 'AAArena',
          description: "A long-running game-agent competition for studying heuristic learning.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06-aaarena/";
            },},{id: "projects-world-models-39-last-exam-in-physics",
          title: 'World Models&amp;#39; Last Exam in Physics',
          description: "Evaluating physical understanding in world models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/07-world-models-physics/";
            },},{id: "projects-pptbench",
          title: 'PPTBench',
          description: "Evaluating coding agents on reconstructing visual content as editable slides.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/08-pptbench/";
            },},{id: "projects-swe-refactor-bench",
          title: 'SWE Refactor Bench',
          description: "Evaluating long-horizon, whole-repository stack migration by coding agents.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/09-swe-refactor/";
            },},{id: "projects-justquant",
          title: 'JustQuant',
          description: "4-bit activation quantization without smoothing, SVD, or rotation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10-justquant/";
            },},{id: "projects-information-gain-sampler",
          title: 'Information-Gain Sampler',
          description: "One-step information-gain planning for sampling masked diffusion models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11-info-gain/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%61%6E%67%6B%61%69%73%65%6E%33%39@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=1sPA9NoAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
