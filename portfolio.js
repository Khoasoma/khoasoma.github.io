(() => {
  const output = document.querySelector('[data-output]');
  const scroller = document.querySelector('[data-terminal-scroll]');
  const form = document.querySelector('[data-command-form]');
  const input = document.querySelector('[data-command-input]');
  const terminal = document.querySelector('[data-terminal]');

  if (!output || !scroller || !form || !input || !terminal) return;

  const commandNames = [
    'help', 'list', 'profile', 'projects', 'stack', 'experience', 'contact',
    'status', 'whoami', 'history', 'date', 'pwd', 'uname', 'open', 'clear'
  ];

  const aliases = {
    '?': 'help',
    ls: 'list',
    about: 'profile',
    work: 'projects',
    skills: 'stack',
    xp: 'experience',
    who: 'whoami',
    cls: 'clear'
  };

  const text = {
    boot: [
      ['SSH-2.0-khoasoma_portfolio_2026.08', 'muted-line'],
      ['Secure connection established.', 'boot-line'],
      ['Authenticated as guest. Type help to begin.', 'boot-line']
    ],
    helpTitle: 'available commands',
    descriptions: {
      help: 'show help or help <command>',
      list: 'list available data nodes',
      profile: 'profile and current status',
      projects: 'selected project work',
      stack: 'languages and tools',
      experience: 'work history',
      contact: 'contact channels',
      status: 'session and work status',
      whoami: 'current user',
      history: 'command history',
      date: 'local date and time',
      pwd: 'current directory',
      uname: 'system information',
      open: 'open a link: open <target>',
      clear: 'clear the screen'
    },
    notFound: 'command not found',
    didYouMean: 'Did you mean',
    openTargets: 'Valid targets: github, xenon, nekotech, email, discord',
    opening: 'Opening',
    blocked: 'The browser blocked the new window.',
    emptyHistory: 'No command history yet.',
    profileTitle: 'profile',
    profile: [
      ['name', 'Khoasoma'],
      ['role', 'Software & Systems Engineer'],
      ['focus', 'Backend / Infrastructure / Performance'],
      ['location', 'Vung Tau, Vietnam'],
      ['work', 'Freelance'],
      ['availability', 'Open to selected work']
    ],
    profileAlt: 'Portrait of Khoasoma',
    projectsTitle: 'projects',
    projects: [
      ['XenonFolia', 'Java / Folia', 'A Folia/Paper fork focused on highly concurrent workloads.', 'https://github.com/Khoasoma/xenonfolia'],
      ['Nekotech', '2024-2026', 'A community technology platform; co-founder and lead developer.', 'https://www.nekofoundation.tech/'],
      ['Production infrastructure', 'Client work', 'Deployment and tuning for web services and real-time game servers.', null]
    ],
    stackTitle: 'stack',
    stack: [
      ['languages', 'Java, JavaScript, Python, PHP'],
      ['backend', 'Spring, Node.js, REST, event-driven'],
      ['data', 'PostgreSQL, MySQL, MongoDB, Redis'],
      ['operate', 'Docker, Linux, Nginx, Cloudflare']
    ],
    experienceTitle: 'experience',
    experience: [
      ['2023-now', 'Freelance', 'Backend & DevOps Engineer'],
      ['2024-2026', 'Nekotech Foundation', 'Co-Founder & Lead Developer'],
      ['2022-2023', 'ZynHost / AsakaCloud', 'Technical Support'],
      ['2021-2022', 'Kingora Network', 'Verified Developer']
    ],
    contactTitle: 'contact',
    contact: [
      ['email', 'kh0a@hcmdev.cloud', 'mailto:kh0a@hcmdev.cloud'],
      ['github', '@Khoasoma', 'https://github.com/Khoasoma'],
      ['discord', '@khoasoma', 'https://discordapp.com/users/808974657994752050']
    ],
    statusTitle: 'status',
    status: [['session', 'active'], ['availability', 'open'], ['mode', 'freelance']],
    listTitle: 'data',
    listItems: ['profile', 'projects', 'stack', 'experience', 'contact', 'status']
  };

  let commandHistory = [];
  let historyIndex = 0;

  const element = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };

  const createBlock = () => element('div', 'output-block');

  const addLine = (block, content, className = '') => {
    block.append(element('p', className, content));
  };

  const addTitle = (block, content) => {
    block.append(element('h2', 'result-title', content));
  };

  const scrollToLatest = () => {
    requestAnimationFrame(() => {
      scroller.scrollTop = scroller.scrollHeight;
    });
  };

  const appendBlock = (block) => {
    output.append(block);
    scrollToLatest();
  };

  const renderBoot = () => {
    const block = createBlock();
    block.append(element('pre', 'accent-green', 'KHOASOMA / SSH PORTFOLIO'));
    text.boot.forEach(([content, className]) => addLine(block, content, className));
    appendBlock(block);
  };

  const appendEcho = (raw) => {
    const block = createBlock();
    const line = element('div', 'command-echo');
    line.append(element('span', 'prompt-user', 'guest@khoasoma'));
    line.append(element('span', 'prompt-path', ':~$'));
    line.append(element('span', 'echo-text', raw));
    block.append(line);
    output.append(block);
    return block;
  };

  const renderHelp = (block, command) => {
    const target = aliases[command] || command;

    if (target) {
      if (!text.descriptions[target]) {
        addLine(block, `${command}: ${text.notFound}`, 'result-error');
        return;
      }
      addTitle(block, target);
      addLine(block, text.descriptions[target], 'muted-line');
      return;
    }

    addTitle(block, text.helpTitle);
    const grid = element('dl', 'help-grid');
    commandNames.forEach((name) => {
      grid.append(element('dt', '', name));
      grid.append(element('dd', '', text.descriptions[name]));
    });
    block.append(grid);
  };

  const renderList = (block) => {
    addTitle(block, text.listTitle);
    const list = element('div', 'data-list');
    text.listItems.forEach((item) => {
      const row = element('div', 'data-row');
      row.append(element('span', 'data-key', 'dr-xr-xr-x'));
      row.append(element('span', 'accent-green', item));
      list.append(row);
    });
    block.append(list);
  };

  const renderProfile = (block) => {
    addTitle(block, text.profileTitle);
    const layout = element('div', 'profile-result');
    const image = document.createElement('img');
    image.src = './assets/portrait-khoa.png';
    image.alt = text.profileAlt;
    image.width = 112;
    image.height = 112;
    image.loading = 'lazy';
    layout.append(image);

    const list = element('div', 'data-list');
    text.profile.forEach(([key, value]) => {
      const row = element('div', 'data-row');
      row.append(element('span', 'data-key', key));
      row.append(element('span', 'data-value', value));
      list.append(row);
    });
    layout.append(list);
    block.append(layout);
  };

  const renderProjects = (block) => {
    addTitle(block, text.projectsTitle);
    const list = element('div', 'project-list');
    text.projects.forEach(([name, meta, description, href], index) => {
      const row = element('article', 'project-row');
      row.append(element('span', 'row-index', String(index + 1).padStart(2, '0')));
      row.append(element('h3', '', name));
      row.append(element('p', '', description));
      if (href) {
        const link = element('a', 'terminal-link', meta);
        link.href = href;
        link.target = '_blank';
        link.rel = 'noreferrer';
        row.append(link);
      } else {
        row.append(element('span', 'row-meta', meta));
      }
      list.append(row);
    });
    block.append(list);
  };

  const renderStack = (block) => {
    addTitle(block, text.stackTitle);
    const groups = element('div', 'stack-groups');
    text.stack.forEach(([name, value]) => {
      const group = element('section', 'stack-group');
      group.append(element('h3', '', name));
      group.append(element('p', '', value));
      groups.append(group);
    });
    block.append(groups);
  };

  const renderExperience = (block) => {
    addTitle(block, text.experienceTitle);
    const list = element('div', 'timeline-list');
    text.experience.forEach(([period, company, role]) => {
      const row = element('article', 'timeline-row');
      row.append(element('span', 'row-meta', period));
      row.append(element('h3', '', company));
      row.append(element('p', '', role));
      list.append(row);
    });
    block.append(list);
  };

  const renderContact = (block) => {
    addTitle(block, text.contactTitle);
    const list = element('div', 'data-list');
    text.contact.forEach(([name, value, href]) => {
      const row = element('div', 'data-row');
      row.append(element('span', 'data-key', name));
      const link = element('a', 'terminal-link', value);
      link.href = href;
      if (!href.startsWith('mailto:')) {
        link.target = '_blank';
        link.rel = 'noreferrer';
      }
      row.append(link);
      list.append(row);
    });
    block.append(list);
  };

  const renderStatus = (block) => {
    addTitle(block, text.statusTitle);
    const grid = element('div', 'status-grid');
    text.status.forEach(([key, value]) => {
      const cell = element('div', 'status-cell');
      cell.append(element('span', '', key));
      cell.append(element('strong', '', value));
      grid.append(cell);
    });
    block.append(grid);
  };

  const editDistance = (a, b) => {
    const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);
    for (let column = 0; column <= a.length; column += 1) matrix[0][column] = column;
    for (let row = 1; row <= b.length; row += 1) {
      for (let column = 1; column <= a.length; column += 1) {
        matrix[row][column] = b[row - 1] === a[column - 1]
          ? matrix[row - 1][column - 1]
          : Math.min(matrix[row - 1][column - 1], matrix[row][column - 1], matrix[row - 1][column]) + 1;
      }
    }
    return matrix[b.length][a.length];
  };

  const suggestCommand = (value) => {
    const ranked = commandNames
      .map((name) => [name, editDistance(value, name)])
      .sort((a, b) => a[1] - b[1]);
    return ranked[0]?.[1] <= 3 ? ranked[0][0] : null;
  };

  const openTarget = (target, block) => {
    const links = {
      github: 'https://github.com/Khoasoma',
      xenon: 'https://github.com/Khoasoma/xenonfolia',
      nekotech: 'https://www.nekofoundation.tech/',
      email: 'mailto:kh0a@hcmdev.cloud',
      discord: 'https://discordapp.com/users/808974657994752050'
    };
    const href = links[target];
    if (!href) {
      addLine(block, text.openTargets, 'result-error');
      return;
    }

    addLine(block, `${text.opening}: ${target}`, 'result-ok');
    if (href.startsWith('mailto:')) {
      window.location.href = href;
      return;
    }
    const opened = window.open(href, '_blank');
    if (opened) opened.opener = null;
    else addLine(block, text.blocked, 'result-error');
  };

  const execute = (rawCommand, options = {}) => {
    const raw = rawCommand.trim();
    if (!raw) return;

    if (raw === 'clear' || raw === 'cls') {
      output.replaceChildren();
      if (!options.skipHistory) {
        commandHistory.push(raw);
        historyIndex = commandHistory.length;
      }
      scrollToLatest();
      return;
    }

    if (!options.skipHistory) {
      commandHistory.push(raw);
      historyIndex = commandHistory.length;
    }

    const block = appendEcho(raw);
    const [typedName, ...args] = raw.split(/\s+/);
    const normalizedName = typedName.toLowerCase();
    const command = aliases[normalizedName] || normalizedName;
    const argument = args.join(' ').toLowerCase();

    switch (command) {
      case 'help': renderHelp(block, argument); break;
      case 'list': renderList(block); break;
      case 'profile': renderProfile(block); break;
      case 'projects': renderProjects(block); break;
      case 'stack': renderStack(block); break;
      case 'experience': renderExperience(block); break;
      case 'contact': renderContact(block); break;
      case 'status': renderStatus(block); break;
      case 'whoami': addLine(block, 'guest'); break;
      case 'pwd': addLine(block, '/home/guest/portfolio'); break;
      case 'uname': addLine(block, 'KhoasomaOS 2026.08 web/ssh x86_64'); break;
      case 'date': addLine(block, new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())); break;
      case 'history':
        if (commandHistory.length <= 1) addLine(block, text.emptyHistory, 'muted-line');
        else commandHistory.slice(0, -1).forEach((item, index) => addLine(block, `${String(index + 1).padStart(3, ' ')}  ${item}`, 'muted-line'));
        break;
      case 'open': openTarget(argument, block); break;
      default: {
        addLine(block, `${typedName}: ${text.notFound}`, 'result-error');
        const suggestion = suggestCommand(normalizedName);
        if (suggestion) addLine(block, `${text.didYouMean}: ${suggestion}?`, 'muted-line');
      }
    }

    scrollToLatest();
  };

  const autocomplete = () => {
    const value = input.value.trim().toLowerCase();
    if (!value || value.includes(' ')) return;
    const names = [...commandNames, ...Object.keys(aliases)];
    const matches = names.filter((name) => name.startsWith(value));
    if (matches.length === 1) input.value = matches[0];
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    execute(value);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = input.value;
      input.value = '';
      execute(value);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = commandHistory[historyIndex] || '';
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      historyIndex = Math.min(commandHistory.length, historyIndex + 1);
      input.value = commandHistory[historyIndex] || '';
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      autocomplete();
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      execute('clear');
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      const block = appendEcho(`${input.value}^C`);
      input.value = '';
      addLine(block, '', 'muted-line');
      scrollToLatest();
    }
  });

  terminal.addEventListener('pointerdown', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('a, button, input')) return;
    if (window.getSelection()?.toString()) return;
    input.focus({ preventScroll: true });
  });

  renderBoot();

  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
