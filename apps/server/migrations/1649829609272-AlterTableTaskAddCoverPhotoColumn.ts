import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTaskAddCoverPhotoColumn1649829609272
  implements MigrationInterface
{
  name = 'AlterTableTaskAddCoverPhotoColumn1649829609272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`cover_photo\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`name\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`name\` varchar(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`name\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`name\` text COLLATE "utf8mb4_0900_ai_ci" NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`cover_photo\`
        `);
  }
}
