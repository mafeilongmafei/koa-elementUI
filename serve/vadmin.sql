/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 50643
 Source Host           : 127.0.0.1:3306
 Source Schema         : vadmin

 Target Server Type    : MySQL
 Target Server Version : 50643
 File Encoding         : 65001

 Date: 23/11/2019 18:54:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for msg
-- ----------------------------
DROP TABLE IF EXISTS `msg`;
CREATE TABLE `msg`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NULL DEFAULT 1,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `article` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uid` int(11) NOT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of msg
-- ----------------------------
INSERT INTO `msg` VALUES (1, 1, '这个时代', '这是一个摧毁你，却与你无关的时代;这是一个跨界打劫你，你却无力反击的时代;这是一个你醒来太慢，干脆就不用醒来的时代;这是一个不是对手比你强，而是你根本连对手是谁都不知道的时代。强者一路高歌猛进，弱者一路节节败退。在这个大跨界的时代，唯有不断学习，才能立于不败之地。', 1, '2019-11-21 20:40:32', '2019-11-22 10:23:24', NULL);
INSERT INTO `msg` VALUES (2, 1, '最大的幸福', '三餐能饱，是幸福，寒暑有备，是幸福，居家安稳，是幸福，出入便捷，是幸福……而最大的幸福，莫过于——一觉醒来，我还活着，而且还能动，还能想，还有梦……', 1, '2019-11-21 20:42:31', '2019-11-22 10:21:10', NULL);

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `art_no` int(11) NOT NULL,
  `putaway` int(11) NULL DEFAULT 1,
  `new_product` int(11) NULL DEFAULT NULL,
  `recommend` int(11) NULL DEFAULT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `inventory` int(11) NOT NULL,
  `sku_id` int(11) NOT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `art_no`(`art_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rank` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'admin',
  `status` int(11) NULL DEFAULT 1,
  `openid` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `openid`(`openid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '$2a$10$nFVnGsdw3xSgJq4YgAKl2uP68WspYFrvBs8kl2eqM22wzgSptUqda', '/images/music.1.png', 'super_editor', 1, NULL, '2019-11-14 10:18:13', '2019-11-23 15:01:51', NULL);
INSERT INTO `user` VALUES (2, 'user', '$2a$10$5SlgflosG8o7OkXKdtlR3OkSv5pMZHRf1kxjBjiaIgSC4fFgG1hNW', '/images/music.3.png', 'admin', 1, NULL, '2019-11-14 10:19:25', '2019-11-21 07:15:24', NULL);
INSERT INTO `user` VALUES (35, '4335', '$2a$10$FjSFXnQHbkL2Qgd8n/MVKORHFiG/U1GNrli0KbJsp1htiR80YdRa6', '/images/upload_282d678f76a41ec92c172627c7978eed.png', 'admin', 1, NULL, '2019-11-20 21:38:26', '2019-11-20 21:38:26', NULL);
INSERT INTO `user` VALUES (38, '5435435', '$2a$10$ydUv4kJAKYOk.YDGTszyS.lUUmcr3aa1ZYtgia5nVuCjSf9gvLSr6', '/images/upload_f04a2cfaf95c062f1b01ec1c84880bd0.png', 'admin', 0, NULL, '2019-11-20 21:38:39', '2019-11-23 14:26:29', NULL);
INSERT INTO `user` VALUES (39, '32324', '$2a$10$SL1FnkCVujdVjG3hDS6wbecS5SOIJ8STu18VAGe/oyH88GjRS2t.e', '/images/upload_2b7601b4fa0557a20ecdb54a8ff3a237.png', 'super_editor', 0, NULL, '2019-11-21 07:04:08', '2019-11-21 18:56:35', NULL);

SET FOREIGN_KEY_CHECKS = 1;
