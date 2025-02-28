# Contributing to Code4Change

This document outlines the process for contributing to this project. Following these guidelines helps maintain code quality and avoid conflicts.

## Git Workflow

### 1. Starting Work on a New Feature

```bash
# Get the latest changes from the main branch
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### 2. During Development

```bash
# Regularly commit your changes
git add .
git commit -m "descriptive message about your changes"

# Keep your branch up to date with main
git checkout main
git pull origin main
git checkout feature/your-feature-name
git merge main
```

### 3. Before Creating a Pull Request

```bash
# Ensure your branch is up to date with main
git checkout main
git pull origin main
git checkout feature/your-feature-name
git merge main

# Review and stage your changes
git status
git add .
git commit -m "final changes before PR"

# Push your branch
git push origin feature/your-feature-name
```

### 4. Creating a Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your feature branch as the compare branch
4. Add a descriptive title and detailed description
5. Request reviews from team members
6. Link any related issues

### 5. Reviewing Pull Requests

When reviewing others' PRs:

1. Pull down the branch locally
2. Test the changes
3. Review the code thoroughly
4. Provide constructive feedback
5. Approve or request changes as needed

### Best Practices

1. **Branch Naming**

   - Use descriptive branch names
   - Format: `feature/feature-name`, `fix/bug-name`, or `docs/documentation-change`

2. **Commits**

   - Write clear, concise commit messages
   - Use present tense ("Add feature" not "Added feature")
   - Reference issue numbers when applicable

3. **Code Review**

   - Review your own code before submitting
   - Address all comments and suggestions
   - Keep discussions constructive and professional

4. **Merge Conflicts**

   - If conflicts arise, resolve them locally before pushing
   - Consult with team members if unsure about conflict resolution
   - Test thoroughly after resolving conflicts

5. **Testing**
   - Run all tests before pushing
   - Add new tests for new features
   - Ensure all CI checks pass

### Handling Merge Conflicts

If you encounter merge conflicts:

```bash
# Get latest changes from main
git checkout main
git pull origin main

# Switch to your branch and merge main
git checkout feature/your-feature-name
git merge main

# Resolve conflicts in your code editor
# After resolving conflicts:
git add .
git commit -m "resolve merge conflicts"
git push origin feature/your-feature-name
```

## Questions or Problems?

If you're unsure about any part of the process, just send a message in the team channel.
