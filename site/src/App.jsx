import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const FILE_TYPES = [
  {
    key: 'skill',
    label: 'Claude skill',
    icon: AutoAwesomeOutlinedIcon,
    blurb: 'Auto-loads in Claude when you work on this system.'
  },
  {
    key: 'md',
    label: 'Markdown spec',
    icon: DescriptionOutlinedIcon,
    blurb: 'Paste into any AI session or commit into your repo.'
  },
  {
    key: 'npm',
    label: 'Node package',
    icon: Inventory2OutlinedIcon,
    blurb: 'Design tokens as JS/TS + CSS vars. (Coming soon.)'
  }
];

function formatBytes(n) {
  if (!n) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

// Minimal markdown → HTML (headings, paragraphs, bold/italic, inline code, code blocks, lists, links).
// Help docs are short and authored by us, so we don't need a full parser dependency in the browser.
function mdToHtml(src) {
  const escape = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const lines = src.split('\n');
  let out = '';
  let inCode = false;
  let inList = false;
  const flushList = () => { if (inList) { out += '</ul>'; inList = false; } };
  for (const raw of lines) {
    const line = raw;
    if (/^```/.test(line)) {
      flushList();
      if (inCode) { out += '</code></pre>'; inCode = false; }
      else { out += '<pre><code>'; inCode = true; }
      continue;
    }
    if (inCode) { out += escape(line) + '\n'; continue; }
    if (/^\s*$/.test(line)) { flushList(); continue; }
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flushList();
      const lvl = h[1].length;
      out += `<h${lvl}>${inline(escape(h[2]))}</h${lvl}>`;
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) { out += '<ul>'; inList = true; }
      out += `<li>${inline(escape(line.replace(/^[-*]\s+/, '')))}</li>`;
      continue;
    }
    flushList();
    out += `<p>${inline(escape(line))}</p>`;
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
  const [fileType, setFileType] = useState(null);

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
  const file = system && fileType ? system.files[fileType] : null;
  const help = manifest?.help?.[fileType] || '';
  const activeStep = !systemId ? 0 : !fileType ? 1 : 2;

  return (
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #EDEBE9' }}>
        <Toolbar>
          <Box sx={{ width: 28, height: 28, bgcolor: 'primary.main', borderRadius: 1, mr: 1.5 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Great Learning Design Systems
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distribution hub
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          <Step><StepLabel>Pick a design system</StepLabel></Step>
          <Step><StepLabel>Pick a file type</StepLabel></Step>
          <Step><StepLabel>Read & download</StepLabel></Step>
        </Stepper>

        {error && (
          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography color="error.dark" variant="subtitle1">Couldn't load manifest.json</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {error} — run <code>npm run build</code> to generate it.
            </Typography>
          </Paper>
        )}

        {!manifest && !error && (
          <Typography color="text.secondary">Loading…</Typography>
        )}

        {manifest && !systemId && (
          <SystemPicker
            systems={manifest.systems}
            onPick={(id) => setSystemId(id)}
          />
        )}

        {manifest && systemId && !fileType && (
          <FileTypePicker
            system={system}
            onBack={() => setSystemId(null)}
            onPick={(key) => setFileType(key)}
          />
        )}

        {manifest && systemId && fileType && (
          <Detail
            system={system}
            fileType={fileType}
            file={file}
            help={help}
            onBack={() => setFileType(null)}
            onReset={() => { setFileType(null); setSystemId(null); }}
          />
        )}
      </Container>

      <Box component="footer" sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="caption">
          Generated {manifest?.generatedAt ? new Date(manifest.generatedAt).toLocaleString() : '—'}
        </Typography>
      </Box>
    </Box>
  );
}

function SystemPicker({ systems, onPick }) {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Pick a design system</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Three systems power Great Learning — internal admin, learner-facing, and the marketing website. Pick the one you're building for.
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        {systems.map((s) => (
          <Card key={s.id} variant="outlined" sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%', alignItems: 'stretch' }} onClick={() => onPick(s.id)}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1.5 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ rowGap: 1 }}>
                  <Chip label={s.audience} size="small" color="primary" variant="outlined" />
                  <Chip label={s.stack} size="small" variant="outlined" />
                </Stack>
                <Typography variant="h4" sx={{ mt: 0.5 }}>{s.name}</Typography>
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
    </Box>
  );
}

function FileTypePicker({ system, onBack, onPick }) {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={onBack} aria-label="Back to systems"><ArrowBackIcon /></IconButton>
        <Typography variant="body2" color="text.secondary">All systems</Typography>
      </Stack>

      <Typography variant="h3" sx={{ mb: 1 }}>{system.name}</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap">
        <Chip label={system.audience} size="small" color="primary" variant="outlined" />
        <Chip label={system.stack} size="small" variant="outlined" />
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 1 }}>{system.summary}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
        Last updated by <strong>{system.updatedBy}</strong> · {system.updatedAt}
      </Typography>

      <Typography variant="h4" sx={{ mb: 2 }}>Pick a file type</Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        {FILE_TYPES.map((ft) => {
          const Icon = ft.icon;
          const f = system.files[ft.key];
          const disabled = !f?.available;
          const card = (
            <Card variant="outlined" sx={{ height: '100%', opacity: disabled ? 0.6 : 1 }}>
              <CardActionArea disabled={disabled} onClick={() => onPick(ft.key)} sx={{ height: '100%', alignItems: 'stretch' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Icon color={disabled ? 'disabled' : 'primary'} />
                    <Typography variant="h5">{ft.label}</Typography>
                    {disabled && <Chip size="small" label="Coming soon" sx={{ ml: 'auto' }} />}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {ft.blurb}
                  </Typography>
                  {f?.available && (
                    <Typography variant="caption" color="text.secondary">
                      {f.filename} · {formatBytes(f.sizeBytes)}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          );
          return disabled ? (
            <Tooltip key={ft.key} title="Not available yet">{card}</Tooltip>
          ) : (
            <React.Fragment key={ft.key}>{card}</React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}

function Detail({ system, fileType, file, help, onBack, onReset }) {
  const ft = FILE_TYPES.find((t) => t.key === fileType);
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={onBack} aria-label="Back to file types"><ArrowBackIcon /></IconButton>
        <Link component="button" onClick={onReset} underline="hover" variant="body2">All systems</Link>
        <Typography variant="body2" color="text.secondary">/</Typography>
        <Link component="button" onClick={onBack} underline="hover" variant="body2">{system.name}</Link>
      </Stack>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 320px' } }}>
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="overline" color="text.secondary">{ft.label}</Typography>
          <Typography variant="h3" sx={{ mb: 2 }}>How to use</Typography>
          <Box
            sx={{
              '& h1, & h2, & h3': { fontWeight: 600, letterSpacing: '-0.4px', mt: 3 },
              '& h1': { fontSize: 24 },
              '& h2': { fontSize: 20 },
              '& h3': { fontSize: 18 },
              '& p': { fontSize: 16, lineHeight: 1.55, my: 1.5 },
              '& ul': { pl: 3, my: 1.5 },
              '& li': { mb: 0.5 },
              '& code': { bgcolor: '#F3F2F1', px: 0.7, py: 0.2, borderRadius: 1, fontSize: 14 },
              '& pre': { bgcolor: '#F3F2F1', p: 2, borderRadius: 1, overflowX: 'auto' },
              '& pre code': { bgcolor: 'transparent', p: 0 },
              '& a': { color: 'primary.main' }
            }}
            dangerouslySetInnerHTML={{ __html: mdToHtml(help) }}
          />
        </Paper>

        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="overline" color="text.secondary">System</Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>{system.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap" rowGap={1}>
              <Chip label={system.audience} size="small" color="primary" variant="outlined" />
              <Chip label={system.stack} size="small" variant="outlined" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {system.summary}
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Typography variant="caption" color="text.secondary" component="div">
              Last updated by
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{system.updatedBy}</Typography>
            <Typography variant="caption" color="text.secondary">{system.updatedAt}</Typography>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="overline" color="text.secondary">Download</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 0.5 }}>{file.filename}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              {formatBytes(file.sizeBytes)}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DownloadIcon />}
              href={file.url}
              download={file.filename}
              disabled={!file.available}
            >
              Download
            </Button>
            {fileType === 'md' && system.files.context?.available && (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mt: 1 }}
                href={system.files.context.url}
                download={system.files.context.filename}
              >
                Also get {system.files.context.filename}
              </Button>
            )}
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
