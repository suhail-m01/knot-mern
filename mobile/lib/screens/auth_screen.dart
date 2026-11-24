import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/custom_button.dart';
import '../widgets/knot_logo.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool _isLogin = true;
  final _formKey = GlobalKey<FormState>();

  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final String _selectedRole = 'user';
  final String _selectedCity = 'Bengaluru';

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final authService = Provider.of<AuthService>(context, listen: false);
    bool success = false;

    if (_isLogin) {
      success = await authService.login(
        _emailController.text.trim(),
        _passwordController.text,
      );
    } else {
      success = await authService.register(
        name: _nameController.text.trim(),
        email: _emailController.text.trim(),
        password: _passwordController.text,
        role: _selectedRole,
        city: _selectedCity,
      );
    }

    if (success && mounted) {
      Navigator.pop(context, true);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(_isLogin ? 'Welcome back to Knot!' : 'Account created successfully!'),
          backgroundColor: KnotTheme.green,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);

    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
          _isLogin ? 'Sign In to Knot' : 'Join Knot',
          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 10),
                const Center(child: KnotLogo(size: 34)),
                const SizedBox(height: 16),

                // Info banner
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: KnotTheme.primarySoft,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: KnotTheme.line),
                  ),
                  child: Row(
                    children: const [
                      Icon(Icons.sync_alt, color: KnotTheme.primary, size: 22),
                      SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          'Your login works seamlessly across both Knot Web and Flutter Mobile.',
                          style: TextStyle(fontSize: 12, color: KnotTheme.ink, fontWeight: FontWeight.w500),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 16),

                if (authService.error != null) ...[
                  Container(
                    padding: const EdgeInsets.all(12),
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: KnotTheme.redSoft,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: KnotTheme.red.withOpacity(0.3)),
                    ),
                    child: Text(
                      authService.error!,
                      style: const TextStyle(color: KnotTheme.red, fontSize: 12.5),
                    ),
                  ),
                ],

                // Card container
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: KnotTheme.line),
                  ),
                  child: Column(
                    children: [
                      // Toggle Tab
                      Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: KnotTheme.surfaceSoft,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: GestureDetector(
                                onTap: () => setState(() => _isLogin = true),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 10),
                                  decoration: BoxDecoration(
                                    color: _isLogin ? Colors.white : Colors.transparent,
                                    borderRadius: BorderRadius.circular(9),
                                    boxShadow: _isLogin ? const [BoxShadow(color: Colors.black12, blurRadius: 4)] : null,
                                  ),
                                  child: Center(
                                    child: Text(
                                      'Sign In',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 13,
                                        color: _isLogin ? KnotTheme.primary : KnotTheme.muted,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Expanded(
                              child: GestureDetector(
                                onTap: () => setState(() => _isLogin = false),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 10),
                                  decoration: BoxDecoration(
                                    color: !_isLogin ? Colors.white : Colors.transparent,
                                    borderRadius: BorderRadius.circular(9),
                                    boxShadow: !_isLogin ? const [BoxShadow(color: Colors.black12, blurRadius: 4)] : null,
                                  ),
                                  child: Center(
                                    child: Text(
                                      'Create Account',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 13,
                                        color: !_isLogin ? KnotTheme.primary : KnotTheme.muted,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 20),

                      if (!_isLogin) ...[
                        TextFormField(
                          controller: _nameController,
                          decoration: const InputDecoration(
                            labelText: 'Full Name',
                            prefixIcon: Icon(Icons.person_outline, size: 20),
                          ),
                          validator: (val) => val == null || val.isEmpty ? 'Please enter your name' : null,
                        ),
                        const SizedBox(height: 14),
                      ],

                      TextFormField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          labelText: 'Email Address',
                          prefixIcon: Icon(Icons.email_outlined, size: 20),
                        ),
                        validator: (val) => val == null || !val.contains('@') ? 'Enter a valid email' : null,
                      ),
                      const SizedBox(height: 14),

                      TextFormField(
                        controller: _passwordController,
                        obscureText: true,
                        decoration: const InputDecoration(
                          labelText: 'Password',
                          prefixIcon: Icon(Icons.lock_outline, size: 20),
                        ),
                        validator: (val) => val == null || val.length < 6 ? 'Password must be at least 6 characters' : null,
                      ),

                      const SizedBox(height: 24),

                      CustomButton(
                        text: _isLogin ? 'Sign In to Knot' : 'Join Knot Community',
                        isLoading: authService.isLoading,
                        onPressed: _submit,
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
