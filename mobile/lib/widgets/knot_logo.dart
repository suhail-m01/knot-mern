import 'package:flutter/material.dart';
import '../theme/knot_theme.dart';

class KnotLogoMarkPainter extends CustomPainter {
  final Color color;
  final Color dotColor;

  KnotLogoMarkPainter({required this.color, required this.dotColor});

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 40.0;
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0 * scale
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final path = Path();
    // Replicating SVG path: M12 9c-5 0-8 3-8 7s3 7 8 7c3 0 5-1 7-3l9-9c2-2 4-3 7-3 4 0 7 3 7 6s-3 6-7 6c-3 0-5-1-7-3L12 29
    path.moveTo(12 * scale, 9 * scale);
    path.cubicTo(7 * scale, 9 * scale, 4 * scale, 12 * scale, 4 * scale, 16 * scale);
    path.cubicTo(4 * scale, 20 * scale, 7 * scale, 23 * scale, 12 * scale, 23 * scale);
    path.cubicTo(15 * scale, 23 * scale, 17 * scale, 22 * scale, 19 * scale, 20 * scale);
    path.lineTo(28 * scale, 11 * scale);
    path.cubicTo(30 * scale, 9 * scale, 32 * scale, 8 * scale, 35 * scale, 8 * scale);
    path.cubicTo(39 * scale, 8 * scale, 42 * scale, 11 * scale, 42 * scale, 14 * scale);
    path.cubicTo(42 * scale, 17 * scale, 39 * scale, 20 * scale, 35 * scale, 20 * scale);
    path.cubicTo(32 * scale, 20 * scale, 30 * scale, 19 * scale, 28 * scale, 17 * scale);
    path.lineTo(12 * scale, 29 * scale);

    canvas.drawPath(path, paint);

    // Circle at cx=29, cy=29, r=6
    final dotPaint = Paint()
      ..color = dotColor
      ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(29 * scale, 29 * scale), 5 * scale, dotPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class KnotLogo extends StatelessWidget {
  final bool inverse;
  final double size;

  const KnotLogo({super.key, this.inverse = false, this.size = 28});

  @override
  Widget build(BuildContext context) {
    final textColor = inverse ? Colors.white : KnotTheme.ink;
    final iconColor = inverse ? Colors.white : KnotTheme.primary;
    final dotColor = inverse ? KnotTheme.accent : KnotTheme.primary;

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        CustomPaint(
          size: Size(size, size),
          painter: KnotLogoMarkPainter(color: iconColor, dotColor: dotColor),
        ),
        const SizedBox(width: 8),
        Text(
          'knot',
          style: TextStyle(
            fontSize: size * 0.85,
            fontWeight: FontWeight.w800,
            letterSpacing: -1.0,
            color: textColor,
          ),
        ),
      ],
    );
  }
}
