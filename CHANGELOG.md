# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.5] - 2025-01-12

### Fixed
- Fixed CI/CD issues with npm prepare script causing build failures
- Corrected Docker action version inconsistency in release workflow
- Changed `prepare` script to `prepublishOnly` to avoid CI conflicts

### Changed
- Improved release workflow stability

## [0.1.4] - 2025-01-12

### Added
- ESLint configuration for code quality assurance
- Prettier configuration for consistent code formatting
- CHANGELOG.md for tracking version changes
- .dockerignore file to optimize Docker builds
- Code quality scripts (lint, format, precommit)
- Additional development dependencies for code quality tools

### Changed
- Updated Docker image references in README to use GitHub Container Registry
- Improved code formatting and consistency across the project
- Enhanced development workflow with linting and formatting tools

### Fixed
- TypeScript error in test files related to error type casting
- Code formatting issues identified by Prettier

## [0.1.3] - 2025-01-12

### Fixed
- Added missing build step in Dockerfile to generate dist directory
- Resolved Docker build failure where dist directory was not found

### Changed
- Migrated Docker registry from Docker Hub to GitHub Container Registry (ghcr.io)
- Updated release workflow to use GitHub Container Registry
- Added necessary permissions for GitHub Container Registry
- Removed dependency on external Docker Hub secrets

## [0.1.2] - 2025-01-12

### Changed
- Migrated Docker registry from Docker Hub to GitHub Container Registry
- Updated release workflow with better GitHub integration
- Improved CI/CD pipeline

### Issues
- Docker build failed due to missing dist directory (fixed in 0.1.3)

## [0.1.1] - Previous release

### Added
- Initial MCP server implementation for Civo cloud platform
- Support for instance management (create, list, reboot, shutdown, start, resize, delete)
- Support for disk image operations (list, get details)
- Support for network management (list, create, rename, delete)
- Support for Kubernetes cluster management (list, create, delete, list versions)
- Rate limiting functionality
- Comprehensive test suite
- Docker support
- npm package publishing

### Features
- Full Civo API integration
- TypeScript implementation
- Jest testing framework
- GitHub Actions CI/CD
- Multi-platform Docker images (linux/amd64, linux/arm64)
