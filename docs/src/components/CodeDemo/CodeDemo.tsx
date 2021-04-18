import React, { useState } from 'react';
import { Language } from 'prism-react-renderer';
import { GitHubLogoIcon } from '@modulz/radix-icons';
import { Paper, Button, ElementsGroup } from '@mantine/core';
import CodeHighlight from '../CodeHighlight/CodeHighlight';
import DocsSection from '../DocsSection/DocsSection';
import useStyles from './CodeDemo.styles';

interface CodeDemoProps {
  code?: string;
  language?: Language;
  demoBackground?: string;
  demoBorder?: boolean;
  children: React.ReactNode;
  toggle?: boolean;
  githubLink?: string;
}

export default function CodeDemo({
  code,
  language,
  children,
  demoBackground = '#fff',
  demoBorder = true,
  toggle = false,
  githubLink,
}: CodeDemoProps) {
  const classes = useStyles();
  const [visible, setVisible] = useState(!toggle);

  return (
    <DocsSection>
      <Paper
        padding="md"
        className={classes.demo}
        style={{
          backgroundColor: demoBackground,
          borderColor: demoBorder ? undefined : 'transparent',
        }}
      >
        {children}

        {toggle && (
          <ElementsGroup position="center" style={{ marginTop: 20 }}>
            <Button variant="outline" onClick={() => setVisible((v) => !v)}>
              {visible ? 'Hide' : 'Show'} code
            </Button>
            <Button
              component="a"
              href={githubLink}
              variant="outline"
              color="gray"
              leftIcon={<GitHubLogoIcon />}
            >
              View source on Github
            </Button>
          </ElementsGroup>
        )}
      </Paper>

      {code && visible && (
        <CodeHighlight code={code} language={language} className={classes.code} />
      )}
    </DocsSection>
  );
}