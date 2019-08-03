#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Pit1Stack } from '../lib/pit1-stack';

const app = new cdk.App();
new Pit1Stack(app, 'Pit1Stack');
