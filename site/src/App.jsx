import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const FILE_TYPES = [
  { key: 'skill', label: 'Claude skill' },
  { key: 'md', label: 'Markdown spec' },
  { key: 'npm', label: 'Node package' }
];

function formatBytes(n) {
  if (!n) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function mdToHtml(src) {
  const escape = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const lines = src.split('\n');
  let out = '';
  let inCode = false;
  let inList = false;
  const flushList = () => { if (inList) { out += '</ul>'; inList = false; } };
  for (const raw of lines) {
    if (/^```/.test(raw)) {
      flushList();
      if (inCode) { out += '</code></pre>'; inCode = false; }
      else { out += '<pre><code>'; inCode = true; }
      continue;
    }
    if (inCode) { out += escape(raw) + '\n'; continue; }
    if (/^\s*$/.test(raw)) { flushList(); continue; }
    const h = raw.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flushList();
      const lvl = h[1].length;
      out += `<h${lvl}>${inline(escape(h[2]))}</h${lvl}>`;
      continue;
    }
    if (/^[-*]\s+/.test(raw)) {
      if (!inList) { out += '<ul>'; inList = true; }
      out += `<li>${inline(escape(raw.replace(/^[-*]\s+/, '')))}</li>`;
      continue;
    }
    flushList();
    out += `<p>${inline(escape(raw))}</p>`;
  }
  flushList();
  if (inCode) out += '</code></pre>';
  return out;
  function inline(s) {
    return s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
}

export default function App() {
  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState(null);
  const [systemId, setSystemId] = useState(null);

  useEffect(() => {
    fetch('manifest.json', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`manifest.json: HTTP ${r.status}`);
        return r.json();
      })
      .then(setManifest)
      .catch((e) => setError(String(e)));
  }, []);

  const system = useMemo(
    () => manifest?.systems.find((s) => s.id === systemId) || null,
    [manifest, systemId]
  );

  return (
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default' }}>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar sx={{ position: 'relative', minHeight: 64 }}>
          <Box
            component="button"
            onClick={() => setSystemId(null)}
            aria-label="Home"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              border: 0,
              background: 'transparent',
              cursor: 'pointer',
              p: 0,
              color: 'text.primary'
            }}
          >
            <img src="gl-logo.svg" alt="" width={140} style={{ display: 'block' }} />
          </Box>

          {manifest && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {manifest.systems.map((s) => {
                const active = s.id === systemId;
                return (
                  <Button
                    key={s.id}
                    onClick={() => setSystemId(s.id)}
                    sx={{
                      color: active ? 'primary.main' : 'text.primary',
                      fontWeight: active ? 600 : 500,
                      textTransform: 'none',
                      px: 2
                    }}
                  >
                    {s.name.replace(' Design System', '')}
                  </Button>
                );
              })}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {error && (
          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography color="error.light" variant="subtitle1">Couldn't load manifest.json</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {error} — run <code>npm run build</code> to generate it.
            </Typography>
          </Paper>
        )}

        {!manifest && !error && <Typography color="text.secondary">Loading…</Typography>}

        {manifest && !systemId && <Home systems={manifest.systems} onPick={setSystemId} />}
        {manifest && systemId && system && <Detail system={system} help={manifest.help || {}} />}
      </Container>
    </Box>
  );
}

function Home({ systems, onPick }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
      {systems.map((s) => (
        <Card key={s.id} variant="outlined" sx={{ height: '100%', bgcolor: 'background.paper' }}>
          <CardActionArea sx={{ height: '100%', alignItems: 'stretch' }} onClick={() => onPick(s.id)}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
              <Typography variant="h4">{s.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                {s.summary}
              </Typography>
              <Divider sx={{ mt: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Last updated by <strong>{s.updatedBy}</strong> · {s.updatedAt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

function DownloadBar({ system, fileType }) {
  const file = system.files[fileType.key];
  if (!file?.available) {
    return (
      <Card variant="outlined" sx={{ mb: 4, bgcolor: 'background.paper' }}>
        <CardContent sx={{ py: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {fileType.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Coming soon — not available for download yet.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 4,
        bgcolor: 'background.paper',
        borderColor: 'primary.main',
        borderWidth: 1
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 2,
          '&:last-child': { pb: 2 }
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, wordBreak: 'break-all' }}
          >
            {file.filename}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatBytes(file.sizeBytes)} · updated by {system.updatedBy} · {system.updatedAt}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          href={file.url}
          download={file.filename}
          sx={{ flexShrink: 0 }}
        >
          Download
        </Button>
      </CardContent>
      {fileType.key === 'md' && system.files.context?.available && (
        <>
          <Divider />
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              '&:last-child': { pb: 1.5 }
            }}
          >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-all' }}>
                {system.files.context.filename}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatBytes(system.files.context.sizeBytes)} · companion context file
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<DownloadIcon />}
              href={system.files.context.url}
              download={system.files.context.filename}
              sx={{ flexShrink: 0 }}
            >
              Context
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}

function Detail({ system, help }) {
  const [tab, setTab] = useState(0);
  const fileType = FILE_TYPES[tab];
  const helpHtml = useMemo(() => mdToHtml(help[fileType.key] || ''), [help, fileType.key]);

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 0.5 }}>{system.name}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
        Last updated by <strong>{system.updatedBy}</strong> · {system.updatedAt}
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3 }}
      >
        {FILE_TYPES.map((ft) => {
          const available = system.files[ft.key]?.available;
          return (
            <Tab
              key={ft.key}
              label={available ? ft.label : `${ft.label} (coming soon)`}
              disabled={!available}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            />
          );
        })}
      </Tabs>

      <Box sx={{ maxWidth: 720 }}>
        <DownloadBar system={system} fileType={fileType} />

        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', mb: 1, letterSpacing: '1.5px' }}
        >
          How to use
        </Typography>
        <Box
          sx={{
            color: 'text.secondary',
            '& h1, & h2, & h3': {
              fontWeight: 600,
              letterSpacing: 0,
              mt: 2,
              mb: 0.5,
              color: 'text.primary'
            },
            '& h1': { fontSize: 14 },
            '& h2': { fontSize: 13 },
            '& h3': { fontSize: 12 },
            '& p': { fontSize: 13, lineHeight: 1.55, my: 1 },
            '& ul': { pl: 2.5, my: 1 },
            '& li': { fontSize: 13, mb: 0.25 },
            '& code': {
              bgcolor: 'rgba(255,255,255,0.08)',
              px: 0.6,
              py: 0.15,
              borderRadius: 1,
              fontSize: 12
            },
            '& pre': {
              bgcolor: 'rgba(255,255,255,0.06)',
              p: 1.5,
              borderRadius: 1,
              overflowX: 'auto',
              fontSize: 12
            },
            '& pre code': { bgcolor: 'transparent', p: 0 },
            '& a': { color: 'primary.main' }
          }}
          dangerouslySetInnerHTML={{ __html: helpHtml }}
        />
      </Box>
    </Box>
  );
}
