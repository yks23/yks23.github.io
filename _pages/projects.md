---
layout: page
title: Projects
permalink: /projects/
description: Research projects in agents, physical intelligence, and efficient generation.
nav: true
nav_order: 3
---
<ul class="project-list">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% for project in sorted_projects %}
<li>
<a href="{{ project.redirect | default: project.url }}"><img src="{{ project.img | relative_url }}" alt="{{ project.title | escape }}" loading="lazy"></a>
<div><h2><a href="{{ project.redirect | default: project.url }}">{{ project.title }}</a></h2>
<p>{{ project.description }}</p>
<div class="project-links"><a href="{{ project.redirect | default: project.url }}">Project</a>{% if project.github %}<a href="{{ project.github }}">Code</a>{% endif %}</div></div>
</li>
{% endfor %}
</ul>

<h2 class="media-heading">Media Coverage</h2>

- BrowserBC: [机器之心](https://mp.weixin.qq.com/s/dMAPeqDszlY0eDopwPAu0w)
- Frontier-Engineering: [机器之心](https://mp.weixin.qq.com/s/4OAjSsihL0T1T9mfXmszDQ)
