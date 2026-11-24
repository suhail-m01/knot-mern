import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../theme/knot_theme.dart';
import '../widgets/custom_button.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final _tokenController = TextEditingController();
  bool _isValidating = false;
  Map<String, dynamic>? _scanResult;
  String? _errorMessage;

  @override
  void dispose() {
    _tokenController.dispose();
    super.dispose();
  }

  Future<void> _verifyToken(String token) async {
    if (token.trim().isEmpty) return;

    setState(() {
      _isValidating = true;
      _errorMessage = null;
      _scanResult = null;
    });

    try {
      final auth = Provider.of<AuthService>(context, listen: false);
      final api = ApiService(token: auth.token, userId: auth.user?.id);
      final res = await api.checkInAttendee(token.trim());

      setState(() {
        _scanResult = res;
        _isValidating = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceAll('Exception: ', '');
        _isValidating = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: KnotTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Organizer Check-In Desk',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: KnotTheme.ink),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Scanner Header Card
              Container(
                padding: const EdgeInsets.all(22),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: KnotTheme.line),
                  boxShadow: const [
                    BoxShadow(
                      color: Color.fromRGBO(39, 28, 66, 0.04),
                      blurRadius: 8,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: KnotTheme.primarySoft,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.qr_code_scanner, size: 40, color: KnotTheme.primary),
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      'Scan Attendee Pass',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KnotTheme.ink),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Validate attendee tickets directly against the shared MongoDB database in real time.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12.5, color: KnotTheme.muted),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              // Token verification input
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: KnotTheme.line),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Manual Pass Token Validation',
                      style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14, color: KnotTheme.ink),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: _tokenController,
                      style: const TextStyle(fontFamily: 'monospace', fontSize: 13),
                      decoration: InputDecoration(
                        labelText: 'Pass Token or QR Data',
                        hintText: 'e.g. TICKET-999',
                        suffixIcon: IconButton(
                          icon: const Icon(Icons.clear, size: 18),
                          onPressed: () => _tokenController.clear(),
                        ),
                      ),
                    ),
                    const SizedBox(height: 14),
                    CustomButton(
                      text: 'Validate Pass & Check In',
                      icon: Icons.how_to_reg,
                      isLoading: _isValidating,
                      onPressed: () => _verifyToken(_tokenController.text),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              // Error or success card
              if (_errorMessage != null) ...[
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: KnotTheme.redSoft,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: KnotTheme.red.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.cancel_outlined, color: KnotTheme.red, size: 24),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          _errorMessage!,
                          style: const TextStyle(color: KnotTheme.red, fontWeight: FontWeight.w600, fontSize: 13),
                        ),
                      ),
                    ],
                  ),
                ),
              ],

              if (_scanResult != null) ...[
                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: KnotTheme.greenSoft,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: KnotTheme.green.withOpacity(0.4)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.check_circle, color: KnotTheme.green, size: 22),
                          SizedBox(width: 8),
                          Text(
                            'Check-In Successful!',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: KnotTheme.green),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        'Attendee: ${_scanResult!['registration']?['userName'] ?? 'Verified Attendee'}',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: KnotTheme.ink),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Event: ${_scanResult!['registration']?['eventTitle'] ?? 'Knot Event'}',
                        style: const TextStyle(fontSize: 12, color: KnotTheme.muted),
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }
}
